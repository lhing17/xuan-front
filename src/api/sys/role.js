import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getList(current, size, params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params: {
      ...params,
      current,
      size
    }
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/update`,
    method: 'put',
    data
  })
}

export function getRole(id) {
  return request({
    url: `/sys/role/get/${id}`,
    method: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
