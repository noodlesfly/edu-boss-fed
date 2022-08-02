import request from '@/utils/request'
export function aliyunImagUploadAddressAdnAuth () {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export function aliyunVideoUploadAddressAdnAuth (params: any) {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

export function aliyunTransCode (data: any) {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

export function aliyunTransCodePercent (id: any) {
  return request({
    method: 'GET',
    url: `/boss/course/upload/aliyunTransCodePercent.json?lessonId=${id}`
  })
}
