import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line
  interface RouteMeta {
    // 是可选的
    ptitie?:string
    title?: string,
    requiresAuth?: boolean
  }
}
