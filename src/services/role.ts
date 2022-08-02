import request from '../utils/request'
import type { roleData } from '@/services/types/role'

export function getAllRole () {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export function addOrEditRole (data: roleData) {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 根据id获取角色
export function getRoleById (id: number | string) {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}
// 获取用户id对应角色
export function getUserRoleById (id: number | string) {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}
