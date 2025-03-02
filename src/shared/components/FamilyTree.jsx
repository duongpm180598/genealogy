import FamilyTree from '@balkangraph/familytree.js'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { db } from '../../../firebase'
import { familyTreeConfig, IT_IS_LONELY_HERE_LINK, SEARCH_PLACEHOLDER } from '../../constants'
import './tree.less'

export const FamilyTreeComponent = (props) => {
  const { data, fetchUsers } = props
  const treeContainerRef = useRef(null)

  const saveHandle = async (payload) => {
    try {
      if (payload?.docId) {
        const membersCollection = doc(db, 'members', payload.docId)
        const docSnapshot = await getDoc(membersCollection)

        if (payload.id && docSnapshot.exists()) {
          await setDoc(membersCollection, payload)
          console.log('Document updated successfully!', payload)
        }
      } else {
        const membersCollection = collection(db, 'members')
        await addDoc(membersCollection, payload)
        fetchUsers()
        console.log('Document add successfully!', payload)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FamilyTree.SEARCH_PLACEHOLDER = SEARCH_PLACEHOLDER
    FamilyTree.RES.IT_IS_LONELY_HERE_LINK = IT_IS_LONELY_HERE_LINK

    const family = new FamilyTree(treeContainerRef.current, familyTreeConfig)
    family.on('field', function (sender, args) {
      if (args.name === 'displayBirthDate') {
        args.value = args.data.birthDate ? moment(args.data.birthDate).format('DD/MM/YYYY') : ''
      }
    })

    family.editUI.on('element-btn-click', function (sender, args) {
      console.log(args)
      FamilyTree.fileUploadDialog(function (file) {
        var formData = new FormData()
        formData.append('file', file)
      })
    })

    family.onUpdateNode(async function (args) {
      console.log(args)
      await saveHandle(args.addNodesData[0])
      await saveHandle(args.updateNodesData[0])
    })

    family.load(data)
  }, [data])

  return (
    <>
      <div ref={treeContainerRef} id='tree'></div>
    </>
  )
}
