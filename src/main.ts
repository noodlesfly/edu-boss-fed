import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(store.PiniaVuePlugin)
const pinia = store.pinia

Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
