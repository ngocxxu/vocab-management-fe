import { redirectToLogin } from '@/utils'
import axios, { AxiosError } from 'axios'

export const STATUS_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  SERVER_ERROR: 500
}

export const API_URL = import.meta.env.VITE_APP_API_URL

// ✅ Simplified setup for cookie-based auth
export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true // Important: automatically sends cookies
})

// ✅ Simplified request interceptor (or no need)
httpClient.interceptors.request.use(
  (config) => {
    // No need to add Authorization header
    // Browser automatically sends cookies
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ✅ Simplified response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config: originalRequest } = error

    if (response?.status === 403) {
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0
      }

      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount++

        // Exponential backoff: 1s, 2s, 4s
        const delayTime = Math.pow(2, originalRequest._retryCount - 1) * 1000
        await delay(delayTime)

        return httpClient(originalRequest)
      }

      redirectToLogin()
    }

    return Promise.reject(error)
  }
)
