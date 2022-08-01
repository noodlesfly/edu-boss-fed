import { RouteConfig } from 'vue-router'
const resourceRules: RouteConfig[] = [
  {
    path: '/resource',
    name: 'resource',
    component: () =>
      import(
        /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
      ),
    meta: {
      ptitle: '权限管理',
      title: '资源管理'
    }
  }
]

export default resourceRules
