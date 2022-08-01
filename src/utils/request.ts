import axios, { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/store/user'
import { Message } from 'element-ui'
import router from '@/router'
import VueRouter from 'vue-router'
import qs from 'qs'

const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : ''
const request = axios.create({
  baseURL
})

request.interceptors.request.use(
  function (config) {
    const userStore = useUserStore()
    if ((userStore.user as any)?.access_token) {
      (config.headers as any).Authorization = (userStore.user as any).access_token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
let isRefreshingToken = false
let cachedRequest = [] as any[]
function redirectToLogin () {
  (router as VueRouter).replace({
    name: 'login',
    query: {
      redirect: (router as VueRouter).currentRoute?.fullPath
    }
  })
}

request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.state === 1 || response.data.code === '000000') {
      return response
    } else {
      Message.error(`${response.data.mesg}`)
      return Promise.reject(response)
    }
  },
  async function (error) {
    // 对响应错误做点什么
    if (error.response) {
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        const userStore = useUserStore()
        if (!userStore.user) {
          redirectToLogin()
          return Promise.reject(error)
        }

        if (!isRefreshingToken) {
          try {
            isRefreshingToken = true
            const requestAnother = axios.create({ baseURL })
            const { data } = await requestAnother({
              method: 'POST',
              url: '/front/user/refresh_token',
              data: qs.stringify({
                refreshtoken: (userStore.user as any).refresh_token
              })
            })
            //  刷新token成功 将新token存入store并 执行缓存中其他请求及本次请求
            if (data.state === 1) {
              userStore.setUser(JSON.parse(data.content))
              while (cachedRequest.length) {
                cachedRequest.shift()()
              }

              return request(error.config)
            } else {
              // 刷新失败 跳转回登录页
              userStore.setUser(null)
              redirectToLogin()
            }
          } catch (error) {
            userStore.setUser(null)
            redirectToLogin()
          } finally {
            isRefreshingToken = false
            cachedRequest = []
          }
        }

        return new Promise(resolve => {
          cachedRequest.push(() => {
            resolve(request(error.config))
          })
        })
      } else if (status === 403) {
        Message.error('没有请求权限，请联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务器内部错误，请联系管理员')
      }
    } else if (error.request) {
      Message.error('请求超时，请刷新重试')
    } else {
      Message.error(`${error.Message}`)
    }
    return Promise.reject(error)
  }
)

// axios实例默认不支持泛型，做一层包装
export default <T>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
