import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/dashboard.vue'), // 路由懒加载
    meta: {
      title: 'dashboard', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'), // 路由懒加载
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/home/about'),
    meta: {
      title: '关于我',
      keepAlive: false
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({ y: 0 }),
    routes: router
  })

export default createRouter()
