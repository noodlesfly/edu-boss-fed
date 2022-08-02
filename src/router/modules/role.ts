import { RouteConfig } from 'vue-router'
const roleRules: RouteConfig[] = [
  {
    path: '/role',
    name: 'role',
    component: () =>
      import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
    meta: {
      ptitle: '权限管理',
      title: '角色管理'
    }
  },
  {
    path: '/role/alloc-menu/:roleid',
    name: 'alloc-menu',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: 'menu-create-or-edit' */ '@/views/role/alloc-menu.vue'
      )
  }
]

export default roleRules
