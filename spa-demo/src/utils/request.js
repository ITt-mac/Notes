import axios from 'axios';
import qs from 'qs';
import { getItem, setItem, removeItem, hcf_TOKEN } from './index';
import { message } from 'antd';
import router from 'umi/router';
import Protection from '@/components/Protection';

let JwtSt = null;

axios.defaults.baseURL = '/';
axios.defaults.timeout = 30000;
axios.defaults.transformRequest = [
  function(data) {
    if (data && data.isFormData) {
      data = data.isFormData;
    } else {
      data = qs.stringify(data);
    }
    return data;
  },
];

const safety_ttl = getItem('safety_ttl');

axios.interceptors.response.use(
  function(res) {
    if (res.data.Code === 'JwtSafetyException') {
      return new Promise(resolve => {
        Protection.showModel(safety_ttl, res, data => {
          resolve(data);
        });
      });
    }
    if (
      res.data.Code === 'TerminalException' ||
      res.data.Code === 'JwtArgumentException' ||
      res.data.Code === 'JwtLoginExpired'
    ) {
      clearTimeout(JwtSt);
      JwtSt = setTimeout(() => {
        removeItem(hcf_TOKEN);
        message.error(res.data.Message || '登陆超时', 1.5, () => {
          clearTimeout(JwtSt);
          router.replace('/login');
        });
      }, 1000);
      return false;
    }
    return res;
  },
  function(err) {
    return Promise.reject(err);
  }
);

const fetch = options => {
  let { method = 'get', data, url, blob = false } = options;
  switch (method.toLowerCase()) {
    case 'get':
      if (data) {
        return axios.get(`${url}?${qs.stringify(data)}`);
      } else {
        return axios.get(`${url}`);
      }
    case 'post':
      if (blob) {
        return axios.post(url, data, { responseType: 'blob' });
      }
      return axios.post(url, data);
    default:
      return axios.post(url, data);
  }
};

export default function request(options) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + getItem(hcf_TOKEN) || '';
  return fetch(options)
    .then(response => {
      // console.log(options)
      const { data, headers } = response;
      if (headers.refresh_token) {
        setItem(hcf_TOKEN, headers.refresh_token);
      }
      if (options.getAllData) {
        if (data.Code === 'NotHaveBindObject') {
          message.error(data.Message || '操作失败');
        }
        return response;
      }
      if (data && data.Code === 'Success') {
        data.success = true;
      } else {
        data.success = false;
        message.error(data.Message || '操作失败');
      }
      if (options.onlyValidation) {
        return response;
      }
      return {
        ...data,
      };
    })
    .catch(() => {
      return {
        success: false,
      };
    });
}
