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

      const memberList = querySnapshot.docs.map((doc, index) => ({
        id: index + 1,
        ...doc.data(),
        mid: doc.mid ?? null,
        fid: doc.fid ?? null,
        birthDate: doc.birthDate ? moment(doc.birthDate).format('DD/MM/YYYY') : null,
        deathDate: doc.deathDate ? moment(doc.deathDate).format('DD/MM/YYYY') : null
      }))
      console.log(memberList)
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

  return <FamilyTreeComponent data={members} />
}
