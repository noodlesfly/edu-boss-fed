import request from '@/utils/request'
import qs from 'qs'
import type { ReqLogin, ResLogin, ResUserInfo, ResLogout } from '@/services/types/user'

export const login = (data:ReqLogin) => {
  return request<ResLogin>({
    url: '/front/user/login',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export function getUserInfo () {
  return request<ResUserInfo>({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export function logout () {
  return request<ResLogout>({
    method: 'POST',
    url: '/front/user/logout'
  })
}
