import { credentialKey, refreshTokenKey, userKey } from '../constants'

export const getBearerToken = () => {
  return `Bearer ${getAccessToken()}`
}

export const getAccessToken = () => {
  return localStorage.getItem(credentialKey)
}

export const setAccessToken = (accessToken) => {
  localStorage.setItem(credentialKey, accessToken)
}

export const saveToken = (accessToken) => {
  setAccessToken(accessToken)
}

export const saveUser = (user) => {
  localStorage.setItem(userKey, JSON.stringify(user))
}

export const getUser = () => {
  return localStorage.getItem(userKey)
}

export const removeAccessToken = () => {
  localStorage.removeItem(credentialKey)
}

export const removeUser = () => {
  localStorage.removeItem(userKey)
}

export const getRefreshToken = () => {
  return localStorage.getItem(refreshTokenKey)
}

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(refreshTokenKey, refreshToken)
}

export const removeRefreshToken = () => {
  localStorage.removeItem(refreshTokenKey)
}
