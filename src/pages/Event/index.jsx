import { Button, Table } from 'antd'
import { Fragment } from 'react'
import '../../assets/styles/style'
import { Link } from 'react-router-dom'

const Event = () => {
  return (
    <Fragment>
      <div className='card'>
        <p className='text-title font-bold fs-24'>Danh sách sự kiện</p>
        <Table columns={columns} dataSource={data} />
      </div>
    </Fragment>
  )
}

const columns = [
  {
    title: 'STT',
    key: 'index',
    render: (_, __, index) => index + 1
  },
  {
    title: 'Tên',
    key: 'name',
    render: () => <div></div>
  },
  {
    title: 'Ngày',
    key: 'date'
  },
  {
    title: 'Tổng tiền',
    key: 'amount',
    render: () => <div></div>
  },
  {
    title: 'Mô tả',
    key: 'description',
    render: () => <div></div>
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (row) => (
      <div className='flex items-center gap-8'>
        <Link to={`su-kien/${row._id}`}>
          <Button type='primary'>Thông tin</Button>
        </Link>
        <Button color='warning' variant='solid'>
          Sửa
        </Button>
        <Button color='danger'>Xóa</Button>
      </div>
    )
  }
]
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
export default Event
