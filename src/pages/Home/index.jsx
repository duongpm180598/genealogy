import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Table } from 'antd'
import moment from 'moment'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/style'
import ConfirmModal from '../../shared/components/ConfirmModal'
import { getAllMembers } from '../../services/members.service'

const Home = () => {
  const [openDelete, setOpenDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState([])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const memberList = await getAllMembers()
      setMembers(memberList)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '50px',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Ảnh',
      key: 'photo',
      width: '100px',
      render: (row) => (
        <Fragment>
          {row.photo ? <Avatar size={64} src={row.photo} /> : <Avatar size={64} icon={<UserOutlined />} />}
        </Fragment>
      )
    },
    {
      title: 'Họ và tên',
      key: 'name',
      render: (row) => row.name
    },
    {
      title: 'Số điện thoại',
      width: '120px',
      key: 'phone',
      render: (row) => row.phone
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      render: (row) => row.address ?? '-'
    },
    {
      title: 'Năm sinh',
      key: 'birthDate',
      width: '120px',
      render: (row) => (row.birthDate ? moment(row.birthDate).format('DD/MM/YYYY') : '-')
    },
    {
      title: 'Năm mất',
      key: 'deathDate',
      width: '120px',
      render: (row) => (row.deathDate ? moment(row.deathDate).format('DD/MM/YYYY') : '-')
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '150px',
      render: (row) => (
        <div className='flex items-center gap-8'>
          <Link to={`/thong-tin/${row._id}`}>
            <Button type='primary'>Thông tin</Button>
          </Link>
          <Link to={`/form-thong-tin/${row._id}`}>
            <Button color='warning' variant='solid'>
              Sửa
            </Button>
          </Link>
          <Button color='danger' onClick={() => setOpenDelete(true)}>
            Xóa
          </Button>
        </div>
      )
    }
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Fragment>
      <div className='card'>
        <p className='text-title font-bold fs-24'>Danh sách thành viên</p>
        <div className='table-responsive'>
          <Table columns={columns} dataSource={members} loading={loading} />
        </div>
        <ConfirmModal
          centered
          isModalOpen={openDelete}
          setIsModalOpen={setOpenDelete}
          modalTitle='Xác nhận xóa thành viên'
          content='Bạn có chắc muốn xóa thành viên này?'
        />
      </div>
    </Fragment>
  )
}

export default Home
