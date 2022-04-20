/* eslint-disable */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

// 登录
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 设置请求拦截器进行设置access_Token
request.interceptors.request.use(config => {
  // 读取登录后的user信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

let isRefreshing = false
let requests = []
// 为防止token过期，设置响应拦截器
request.interceptors.response.use(response => {
  return response
}, error => {
  let message =''
  if (error.response) {
   const { status } = error.response
   if (status === 400) {
     message = '请求参数错误'
     Toast(message)
   } else if (status === 401) {
    // 说明Token无效
    // 判断用户是否登录
    if (!store.state.user) {
      redirectLogin()
      return Promise.reject(error)
    }
    // 判断是否处于刷新refresh状态
    if (isRefreshing) {
      return requests.push(() => {
        request(error.config)
      })
    }
    isRefreshing = true
    // 根据refresh_token重新获取access_token
    return request({
      method: 'POST',
      url: '/front/user/refresh_token',
      data: new window.URLSearchParams({
        refreshtoken: store.state.user.refresh_token
      }).toString()
      // data: new window.URLSearchParams({
      //   refreshtoken: JSON.parse(window.sessionStorage.getItem('user')).refresh_token
      // }).toString()
    }).then((res) => {
      if (res.data.state !== 1) {
        // 刷新token失败 清除无效的用户信息
        store.commit('setUserInfo', null)
        return Promise.reject(error)
      }
      // 刷新token成功后，将token替换
      store.commit('setUserInfo', res.data.content)
      // 将所有错误重新发送
      requests.forEach(callback => callback())
      requests = []
      // 本次错误重新发送
      return request(error.config)
    }).catch (error => console.log(error)).finally(() => { isRefreshing = false })
   } else if (status === 403) {
     message = '无权限，请联系管理员'
     Toast(message)
   } else if (status === 500) {
     message = '服务端错误'
     Toast(message)
   }
  } else if (error.request) {
    message = '请求超时,请重试'
  } else {
    Toast(error.message)
  }
})

export default request
/* eslint-enable */
