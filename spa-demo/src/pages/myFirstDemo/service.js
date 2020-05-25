import { request, config } from "utils";
const APIV2 = config.APIV2;

export function query(params) {
  return request({
    url: `${APIV2}/myFirstDemo/List`,
    method: "get",
    data: params,
  });
}
export function create(params) {
  let url = `${APIV2}/template_save`;
  if (params.id) {
    url = `${APIV2}/template_update`;
  }
  return request({
    url: url,
    method: "post",
    data: params,
  });
}

export function remove(params) {
  return request({
    url: `${APIV2}/template_remove`,
    method: "post",
    data: params,
  });
}
