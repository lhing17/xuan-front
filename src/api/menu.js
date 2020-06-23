import request from '@/utils/request'

export function menuTree() {
  return request({
    url: '/sys/menu/tree',
    method: 'get'
  })
}
