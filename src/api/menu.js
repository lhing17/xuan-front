import request from '@/utils/request'

export function menuTree() {
  return request({
    url: '/sys/menu/tree',
    method: 'get'
  })
}

export function getList(current, size, params) {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}
