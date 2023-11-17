import axios from 'axios';
// // import Commerce from '@chec/commerce.js';

export const STATUS_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500,
};

export const ACCESSTOKEN = 'accessToken';
export const REFRESHTOKEN = 'refreshToken';
export const API_URL = import.meta.env.VITE_APP_API_URL;

//setup axios interceptor
export const httpClient = axios.create({
  baseURL: API_URL, //Domain khi request api sẽ được ghép vào với link
  timeout: 30000, //Thời gian tối đa chờ response trả về
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    config.headers = {
      ...config.headers, //Lấy lại tất cả các giá trị header qua thuộc tính headers
      Authorization: `${
        localStorage.getItem(ACCESSTOKEN)
          ? 'Bearer ' + JSON.parse(localStorage.getItem(ACCESSTOKEN) || '')
          : ''
      }`,
    };
    return config;
  },
  async (error) => {
    return Promise.reject({ error });
  }
);
