import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Loader } from '@/components/loader'

export const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading while checking authentication
  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
