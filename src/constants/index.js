import FamilyTree from '@balkangraph/familytree.js'

export const credentialKey = 'jwt'
export const userKey = 'user'
export const refreshTokenKey = 'refreshToken'

export const SEARCH_PLACEHOLDER = 'Tìm kiếm tên thành viên'
export const IT_IS_LONELY_HERE_LINK = 'Hiện tại chưa có thành viên nào, bấm để thêm'

const getOptions = () => {
  const searchParams = new URLSearchParams(window.location.search)
  var fit = searchParams.get('fit')
  var enableSearch = true
  var scaleInitial = 1
  if (fit === 'yes') {
    enableSearch = false
    scaleInitial = FamilyTree.match.boundary
  }
  return { enableSearch, scaleInitial }
}

export const familyTreeConfig = {
  mouseScrool: FamilyTree.none,
  scaleInitial: getOptions().scaleInitial,
  mode: 'light',
  nodeMenu: {
    edit: { text: 'Sửa' },
    details: { text: 'Chi tiết' },
    remove: { text: 'Xóa' }
  },
  nodeTreeMenu: true,
  nodeBinding: {
    field_0: 'name',
    field_1: 'dob',
    img_0: 'photo'
  },
  editForm: {
    titleBinding: 'name',
    photoBinding: 'photo',
    addMoreFieldName: '',
    addMore: '',
    addMoreBtn: '',
    saveAndCloseBtn: 'Lưu',
    cancelBtn: 'Hủy',
    elements: [
      { type: 'textbox', label: 'Họ và tên', binding: 'name' },
      [
        { type: 'date', label: 'Năm sinh', binding: 'birthDate' },
        { type: 'date', label: 'Năm mất', binding: 'deathDate' }
      ],
      [
        { type: 'textbox', label: 'Số điện thoại', binding: 'phone' },
        {
          type: 'select',
          options: [
            { value: 'male', text: 'Nam' },
            { value: 'female', text: 'Nữ' }
          ],
          label: 'Giới tính',
          binding: 'gender'
        }
      ],
      { type: 'textbox', label: 'Địa chỉ', binding: 'address' },
      { type: 'textbox', label: 'Ảnh đại diện', binding: 'photo', btn: 'Upload' }
    ],
    buttons: {
      edit: {
        icon: FamilyTree.icon.edit(24, 24, '#fff'),
        text: 'Sửa thông tin',
        hideIfEditMode: true,
        hideIfDetailsMode: false
      },
      remove: {
        icon: FamilyTree.icon.remove(24, 24, '#fff'),
        text: 'Xóa thành viên',
        hideIfEditMode: true,
        hideIfDetailsMode: false
      },
      share: null,
      pdf: null
    }
  }
}
