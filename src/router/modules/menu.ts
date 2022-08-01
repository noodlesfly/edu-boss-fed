import { RouteConfig } from 'vue-router'
const menuRules: RouteConfig[] = [
  {
    path: 'menu',
    name: 'menu',
    component: () =>
      import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
    meta: {
      ptitle: '权限管理',
      title: '菜单管理'
    }
  },
  {
    path: 'menu/create',
    name: 'menu-create',
    meta: {
      ptitle: '权限管理',
      title: '创建菜单'
    },
    component: () =>
      import(
        /* webpackChunkName: 'menu' */ '@/views/menu/create.vue'
      )
  },
  {
    path: 'menu/edit/:id',
    name: 'menu-edit',
    meta: {
      ptitle: '权限管理',
      title: '编辑菜单'
    },
    props: true,
    component: () =>
      import(
        /* webpackChunkName: 'menu' */ '@/views/menu/edit.vue'
      )
  }
]

export default menuRules
