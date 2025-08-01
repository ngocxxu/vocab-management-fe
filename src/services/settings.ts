import { redirectToLogin } from '@/utils'
import axios, { AxiosError } from 'axios'
import { postRefreshToken } from './auth/usePostRefreshToken'

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

// ✅ Simplified response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config: originalRequest } = error

    if (response?.status === 401) {
      try {
        // Call refresh endpoint - browser automatically sends refresh cookie
        await postRefreshToken()
        
        // Retry the original request
        return httpClient(originalRequest)
      } catch (refreshError) {
        redirectToLogin()
        return Promise.reject(refreshError)
      }
    }

    if (response?.status === 403) {
      redirectToLogin()
    }

    return Promise.reject(error)
  }
)