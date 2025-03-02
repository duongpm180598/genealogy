import { axios } from './axios.service'

export const getAllMembers = async () => {
  try {
    const res = await axios.get('/members')
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getMemberById = async (id) => {
  try {
    const res = await axios.get(`/members/${id}`)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export const updateMember = async (payload) => {
  try {
    const res = await axios.put('/members', payload)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteMemberById = async (id) => {
  try {
    const res = await axios.delete(`/members/${id}`)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}
