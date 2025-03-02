import { jwtDecode } from 'jwt-decode'
import { axios } from './axios.service'
import { saveToken, saveUser } from './localStorage'

export const loginWithCredential = async (payload) => {
  try {
    const res = await axios.post('/auth/sign-in', payload)
    const data = res.data
    const decoded = jwtDecode(data.access_token)
    saveToken(data.access_token)
    saveUser(decoded)
    return res
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unexpected error occurred')
  }
}
