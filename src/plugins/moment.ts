
import moment from 'moment'
export default {
  install (Vue: any) {
    Vue.filter('dateFormat', function (value:string) {
      return moment(value).format('DD MM YYYY hh:mm:ss')
    })
  }
}
