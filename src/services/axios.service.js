import axiosRequest from 'axios'
import { getAccessToken } from './localStorage'

export const axios = axiosRequest.create({
  baseURL: 'http://localhost:3000' // Mặc định nếu biến môi trường không tồn tại
})

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken() // Function to get the current token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)
