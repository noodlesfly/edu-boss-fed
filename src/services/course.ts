import request from './../utils/request'
import { ReqCourses, stateData } from '@/services/types/course'

export function getQueryCourses (data: ReqCourses) {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export function changeState (params: stateData) {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

export function saveOrUpdateCourse (data: any) {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export function uploadCourseImg (data: any, onUploadProgress?: any) {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}

export function getCourseById (id: number | string) {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId: id
    }
  })
}

export function getSectionAndLesson (id: number | string) {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId: id
    }
  })
}

export function saveOrUpdateSection (data: any) {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

export function saveOrUpdateLesson (data: any) {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
