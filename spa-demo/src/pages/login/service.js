import { request, config } from 'utils'

const { APIV1 } = config

export function login (data) {
  return request({
    url: `${APIV1}/login`,
    method: 'post',
    data,
  })
}
