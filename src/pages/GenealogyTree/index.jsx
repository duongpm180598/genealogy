import { useEffect, useState } from 'react'
import { FamilyTreeComponent } from '../../shared/components/FamilyTree'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import moment from 'moment'

export const GenealogyTree = () => {
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState([])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const membersCollection = collection(db, 'members') // Tạo reference tới collection
      const querySnapshot = await getDocs(membersCollection) // Lấy dữ liệu
      const memberList = querySnapshot.docs.map((docData) => {
        const doc = docData.data()
        return {
          ...doc,
          id: doc.id,
          docId: docData.id,
          mid: doc.mid || '',
          fid: doc.fid || '',
          birthDate: doc.birthDate ? moment(doc.birthDate).format('YYYY-MM-DD') : null,
          deathDate: doc.deathDate ? moment(doc.deathDate).format('YYYY-MM-DD') : null
        }
      })
      setMembers(memberList)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  if (loading) return null
  return <FamilyTreeComponent data={members} fetchUsers={fetchUsers} />
}
