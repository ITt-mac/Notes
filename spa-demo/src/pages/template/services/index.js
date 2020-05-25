import { request, config } from "utils";
const APIV1 = config.APIV1;

export function query(params) {
  return request({
    url: `${APIV1}/template_index`,
    method: "get",
    data: params,
  });
}
export function create(params) {
  let url = `${APIV1}/template_save`;
  if (params.id) {
    url = `${APIV1}/template_update`;
  }
  return request({
    url: url,
    method: "post",
    data: params,
  });
}

export function remove(params) {
  return request({
    url: `${APIV1}/template_remove`,
    method: "post",
    data: params,
  });
}
