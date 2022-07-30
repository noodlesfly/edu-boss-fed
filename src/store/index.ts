import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default {
  pinia,
  PiniaVuePlugin
}
