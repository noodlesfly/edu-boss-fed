import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import menuRules from './modules/menu'
import resourceRules from './modules/resource'
import nprogress from 'nprogress'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@/store/user'
import store from '@/store/index'

Vue.use(VueRouter)
const userStore = useUserStore(store.pinia)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          title: '',
          ptitle: ''
        }
      },
      ...menuRules,
      ...resourceRules
      // {
      //   path: '/role',
      //   name: 'role',
      //   component: () =>
      //     import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      //   meta: {
      //     ptitle: '权限管理',
      //     title: '角色管理'
      //   }
      // },
      // {
      //   path: '/course',
      //   name: 'course',
      //   component: () =>
      //     import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
      //   meta: {
      //     ptitle: '',
      //     title: '课程管理'
      //   }
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () =>
      //     import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
      //   meta: {
      //     ptitle: '',
      //     title: '用户管理'
      //   }
      // },
      // {
      //   path: '/advert',
      //   name: 'advert',
      //   component: () =>
      //     import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
      //   meta: {
      //     ptitle: '广告管理',
      //     title: '广告列表'
      //   }
      // },
      // {
      //   path: '/advert-space',
      //   name: 'advert-space',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
      //     ),
      //   meta: {
      //     ptitle: '广告管理',
      //     title: '广告位列表'
      //   }
      // },
      // {
      //   path: '/role/alloc-menu/:roleid',
      //   name: 'alloc-menu',
      //   props: true,
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'menu-create-or-edit' */ '@/views/role/alloc-menu.vue'
      //     )
      // },
      // {
      //   path: '/course/add',
      //   name: 'course-add',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'course' */ '@/views/course/components/add.vue'
      //     )
      // },
      // {
      //   path: '/course/update/:courseId',
      //   name: 'course-update',
      //   props: true,
      //   component: () =>
      //     import(
      //       /* webpackChunkName: 'course' */ '@/views/course/components/update.vue'
      //     )
      // },
      // {
      //   path: '/course/section/:courseId',
      //   name: 'course-section',
      //   props: true,
      //   component: () =>
      //     import(/* webpackChunkName: 'course' */ '@/views/course/section.vue')
      // },
      // {
      //   path: '/course/video/:courseId',
      //   name: 'course-video',
      //   props: true,
      //   component: () =>
      //     import(/* webpackChunkName: 'course' */ '@/views/course/video.vue')
      // }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  nprogress.start()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
