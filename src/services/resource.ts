import request from '@/utils/request'
import type { ResourceData, ResourceCategories } from '@/services/types/resource'

export function getResourcePages (data: ResourceData) {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类列表
export function getAllCategories () {
  return request<ResourceCategories[]>({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
