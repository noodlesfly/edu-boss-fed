import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from '@/plugins/element'
import Moment from '@/plugins/moment'
import store from './store'

import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.use(store.PiniaVuePlugin)
Vue.use(Moment)

const pinia = store.pinia

Vue.config.productionTip = false

new Vue({
  router: router as VueRouter,
  pinia,
  render: h => h(App)
}).$mount('#app')
