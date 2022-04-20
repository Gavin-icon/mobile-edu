import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '@/views/course'
// eslint-disable-next-line
import store from '@/store'
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
    component: () => import(/* webpackChunkName: learn */'@/views/learn'),
    meta: {
      requiresAuth: true
    }
  },
  // 课程目录页面
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: course-info */'@/views/course-info'),
    props: true
  },
  // 视频页面
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: lesson-video */'@/views/course-info/video'),
    props: true
  },
  // 支付页面
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: pay */'@/views/pay'),
    meta: { requiresAuth: true },
    props: true
  },
  // 用户页面
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: user */'@/views/user'),
    meta: {
      requiresAuth: true
    }
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

// 设置导航守卫，判断是否需要跳转到登录页面
router.beforeEach((to, from, next) => {
  // 查看用户达到页面是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(store.state.user)
    // 查看用户是否登录
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
    next()
  } else {
    next()
  }
})

export default router
