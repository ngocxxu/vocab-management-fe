import { Navigate } from 'react-router-dom'

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const getAccessToken = () => {
    return localStorage.getItem('accessToken')
  }

  const isAuthenticated = () => {
    return !!getAccessToken()
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
