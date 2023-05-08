import axios, {AxiosResponse} from 'axios';
import Apis from '../services/Apis';

const instance = axios.create({
  // baseURL: 'http://192.168.1.3:7001',
  // baseURL: 'http://192.168.1.2:7001',
  baseURL: 'http://172.16.23.186:7001',
  timeout: 10 * 1000,
});

export const request = (
  name: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  const api = (Apis as any)[name];
  if (!api) {
    return Promise.reject('接口不存在');
  }
  const {url, method} = api;
  if (method === 'get') {
    return get(url, params);
  } else {
    return post(url, params);
  }
};

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    if (response) {
      const {status} = response;
      if (status >= 500) {
        // 服务端报错
      } else if (status === 400) {
        // 接口参数异常
      } else if (status === 401) {
        // 登陆信息过期，需要重新登陆
      } else {
        // 其它错误类型，统一按照接口报错处理
      }
    } else {
      // 网络异常
    }
    return Promise.reject(error);
  },
);

// get请求
export const get = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.get(url, {params});
};

// post请求
export const post = (
  url: string,
  params: any,
): Promise<AxiosResponse<any, any>> => {
  return instance.post(url, params);
};
