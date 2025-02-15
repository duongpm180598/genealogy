import { Avatar, Button, Table } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import '../../assets/styles/style'
import ConfirmModal from '../../shared/components/ConfirmModal'
import { Link } from 'react-router-dom'
import { db } from '../../../firebase'
import moment from 'moment'
import { collection, getDocs } from 'firebase/firestore'

const Home = () => {
  const [openDelete, setOpenDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState([])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const membersCollection = collection(db, 'members') // Tạo reference tới collection
      const querySnapshot = await getDocs(membersCollection) // Lấy dữ liệu

      const memberList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
      title: 'Địa chỉ',
      key: 'name',
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
          <Link to={`/thong-tin/${row.id}`}>
            <Button type='primary'>Thông tin</Button>
          </Link>
          <Link to={`/sua-thong-tin/${row.id}`}>
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
        <Table columns={columns} dataSource={members} loading={loading} />
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
export default Home
