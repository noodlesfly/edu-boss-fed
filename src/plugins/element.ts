import { VueConstructor } from 'vue'
import ElementUI from 'element-ui'

export default {
  install (vue: VueConstructor) {
    vue.use(ElementUI, { size: 'small' })
  }
}
