import axios, { AxiosError } from 'axios'
import { postRefreshToken } from './auth/usePostRefreshToken'

export const STATUS_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500
}

export const ACCESSTOKEN = 'accessToken'
export const REFRESHTOKEN = 'refreshToken'
export const API_URL = import.meta.env.VITE_APP_API_URL

//setup axios interceptor
export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

httpClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: `${
        localStorage.getItem(ACCESSTOKEN) ?
          'Bearer ' + JSON.parse(localStorage.getItem(ACCESSTOKEN) || '')
        : ''
      }`
    }
    return config
  },
  async (error: AxiosError) => {
    return Promise.reject({ error })
  }
)

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await postRefreshToken({
          refreshToken: localStorage.getItem(REFRESHTOKEN) ?? ''
        })
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        // Redirect to login if refresh fails
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
