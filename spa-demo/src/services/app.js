import { request, config } from 'utils'

const { api, APIV1, APIV2 } = config
const { userLogout } = api

export function login (params) {
  return request({
    url: `${APIV1}/login`,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  return request({
    url: `${APIV2}/user/logout`,
    method: 'get',
    data: params,
  })
}

export function query (params) {
  return request({
    url: `${APIV1}/admin_info`,
    method: 'get',
    data: params,
  })
}

export function sort (params) {
  return request({
    url: `${APIV1}/sort`,
    method: 'post',
    data: params,
  })
}

