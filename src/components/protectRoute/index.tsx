import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
