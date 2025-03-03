import { clearTokens, getTokens, setTokens } from './token'
import { isValidToken } from './isValidToken'
import axios from 'axios'

const baseURL = 'http://localhost:8000'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const axiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  headers,
  // withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { access_token } = getTokens()
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const previousRequest = error?.config

    if (error?.response?.status === 401 && !previousRequest?.sent) {
      previousRequest.sent = true
      const { refresh_token } = getTokens()
      if (refresh_token && isValidToken(refresh_token)) {
        try {
          const { refresh_token } = getTokens()
          const response = await axios.get(baseURL + '/api/auth/refresh', {
            headers: {
              Authorization: `Bearer ${refresh_token}`,
            },
          })
          const { access_token: new_accessToken, refresh_token: new_refresh_token } =
            response.data.payload
          setTokens(new_accessToken, new_refresh_token)
          previousRequest.headers['Authorization'] = `Bearer ${new_accessToken}`
          return axiosInstance(previousRequest)
        } catch (error: unknown) {
          clearTokens()
          return Promise.reject(error)
        }
      } else {
        clearTokens()
      }
    }

    return Promise.reject((error.response && error.response.data) || 'Something went wrong!')
  }
)

export default axiosInstance
