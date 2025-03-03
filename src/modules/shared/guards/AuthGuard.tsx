import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default AuthGuard
