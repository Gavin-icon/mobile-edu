import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '@/views/course'
Vue.use(VueRouter)
const routes = [
  // 默认页面，选课页面
  {
    path: '/',
    name: 'course',
    component: Course
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: login */'@/views/login')
  },
  // 学习页面
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: learn */'@/views/learn')
  },
  // 用户页面
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: user */'@/views/user')
  },
  // error-page页面
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: error */'@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})

export default router
