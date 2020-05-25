import { request, config } from 'utils'

const { APIV1, APIV2 } = config

export function query (params) {
  return request({
    url: `${APIV1}/resource_index`,
    method: 'get',
    data: params,
  })
}
