import request from '@/utils/request'

// 登录验证接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // 移动端特有功能介绍
    data: new URLSearchParams(data).toString()
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
