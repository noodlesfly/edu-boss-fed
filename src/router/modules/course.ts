import { RouteConfig } from 'vue-router'
const courseRules: RouteConfig[] = [
  {
    path: '/course',
    name: 'course',
    component: () =>
      import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
    meta: {
      ptitle: '',
      title: '课程管理'
    }
  },
  {
    path: '/course/add',
    name: 'course-add',
    component: () =>
      import(
        /* webpackChunkName: 'course' */ '@/views/course/components/add.vue'
      )
  },
  {
    path: '/course/update/:courseId',
    name: 'course-update',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: 'course' */ '@/views/course/components/update.vue'
      )
  },
  {
    path: '/course/section/:courseId',
    name: 'course-section',
    props: true,
    component: () =>
      import(/* webpackChunkName: 'course' */ '@/views/course/section.vue')
  },
  {
    path: '/course/video/:courseId',
    name: 'course-video',
    props: true,
    component: () =>
      import(/* webpackChunkName: 'course' */ '@/views/course/video.vue')
  }
]

export default courseRules
