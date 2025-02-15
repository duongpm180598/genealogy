import FamilyTree from '@balkangraph/familytree.js'
import { useEffect, useRef } from 'react'
import { familyTreeConfig, IT_IS_LONELY_HERE_LINK, SEARCH_PLACEHOLDER } from '../../constants'
import './tree.less'

export const FamilyTreeComponent = (props) => {
  const { data } = props
  const treeContainerRef = useRef(null)

  useEffect(() => {
    FamilyTree.SEARCH_PLACEHOLDER = SEARCH_PLACEHOLDER
    FamilyTree.RES.IT_IS_LONELY_HERE_LINK = IT_IS_LONELY_HERE_LINK
    const family = new FamilyTree(treeContainerRef.current, familyTreeConfig)

    family.on('field', function (sender, args) {
      if (args.name === 'born') {
        var date = new Date(args.value)
        args.value = date.toLocaleDateString()
      }
    })

    family.editUI.on('element-btn-click', function (sender, args) {
      console.log(sender)
      console.log(args)
      FamilyTree.fileUploadDialog(function (file) {
        var formData = new FormData()
        formData.append('file', file)
      })
    })

    family.load(data)
  }, [data])

  return (
    <>
      <div ref={treeContainerRef} id='tree'></div>
    </>
  )
}
