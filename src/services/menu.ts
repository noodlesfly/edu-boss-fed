import request from '@/utils/request'
import { menuData, ParentMenuList } from './types/menu'

export function addOrUpdateMenu (data: menuData) {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取上级菜单列表
export function getParentList (id = '-1') {
  return request<ParentMenuList>({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 获取菜单列表
export function getAllMenus () {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 删除菜单
export function delMenu (id: number) {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
// 获取所有菜单并按层级展示
export function getMenuNodeList () {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}
interface allocateData {
  roleId: string | number;
  menuIdList: any[];
}
// 给角色分配菜单列表
export function allocateRoleMenus (data: allocateData) {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
// 获取用户拥有的菜单列表
export function getRoleMenus (id: number | string) {
  return request({
    method: 'GET',
    url: `/boss/menu/getRoleMenus?roleId=${id}`
  })
}
