import { useEffect } from 'react'
import axiosInstance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux'
import { initialise } from '../../auth/data/authSlice'
import { isValidToken } from '../utils/isValidToken'
import LazyLoad from '../components/LazyLoad/LazyLoad'
import useIsMounted from '../hook/useIsMountedRef'
import { clearTokens, getTokens } from '../utils/token'
import { RootState } from '../store'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const { isInitialised } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isMounted.current) {
      return
    }

    async function fetchUser() {
      const { refresh_token } = getTokens()
      if (refresh_token && isValidToken(refresh_token)) {
        try {
          const response = await axiosInstance.get('/api/auth/me')
          const user = response.data
          dispatch(initialise({ isAuthenticated: true, user }))
        } catch (error) {
          dispatch(initialise({ isAuthenticated: false, user: null }))
          clearTokens()
        }
      } else {
        dispatch(initialise({ isAuthenticated: false, user: null }))
        clearTokens()
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isInitialised) {
    return <LazyLoad />
  }

  return <>{children}</>
}

export default AuthProvider
