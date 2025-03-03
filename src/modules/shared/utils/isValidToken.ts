import { jwtDecode, JwtPayload } from 'jwt-decode'

export const isValidToken = (token: string) => {
  const decoded: JwtPayload = jwtDecode(token)
  const currentTime = Date.now() / 1000
  return Number(decoded.exp) > currentTime
}
