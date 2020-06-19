import request from '@/utils/request'

export function menuTree() {
  return request({
    url: '/menu/tree',
    method: 'get'
  })
}