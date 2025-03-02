import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { Edit, PlusCircle } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMemberById } from '../../../services/members.service'

export const UserInfo = () => {
  const { id } = useParams()
  const [form] = Form.useForm()

  const fetchMemberById = useCallback(async () => {
    try {
      const member = await getMemberById(id)

      form.setFieldsValue({
        ...member,
        birthDate: member.birthDate ? dayjs(member.birthDate) : null,
        deathDate: member.deathDate ? dayjs(member.deathDate) : null
      })
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    fetchMemberById()
  }, [fetchMemberById])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <Link to={`/form-thong-tin/${id}`}>
          <Button>
            <Edit /> Sửa thông tin
          </Button>
        </Link>
        <div className='flex gap-8'>
          <Button>
            <PlusCircle /> Thêm vợ
          </Button>
          <Button>
            <PlusCircle /> Thêm con trai
          </Button>
          <Button>
            <PlusCircle /> Thêm con gái
          </Button>
        </div>
      </div>

      <Divider />

      <Row gutter={16} className='justify-center'>
        <Col xs={24} sm={8}>
          {/* <Avatar shape='square' size={64} src={''} /> */}
          <Avatar className='avatar-wrapper' shape='square' size={64} icon={<UserOutlined />} />
        </Col>
        <Col xs={24} sm={16}>
          <Form form={form} variant={'outlined'}>
            <Row className='mb-16' gutter={8}>
              <Col span={12}>
                <Form.Item
                  label='Họ và tên'
                  name='name'
                  layout='vertical'
                  rules={[
                    {
                      required: true,
                      message: 'Trường bắt buộc'
                    }
                  ]}
                >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Tên gọi khác' name='nickname' layout='vertical'>
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Vị trí trong họ' name='position' layout='vertical'>
                  <Select
                    readOnly
                    options={[
                      { label: 'Thành viên', value: 'member' },
                      { label: 'Trưởng nam', value: 'leader' }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mb-16' gutter={8}>
              <Col span={4}>
                <Form.Item label='Giới tính' name='gender' layout='vertical'>
                  <Select
                    readOnly
                    options={[
                      { label: 'Nam', value: 'male' },
                      { label: 'Nữ', value: 'famale' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label='Số điện thoại' name='phone' layout='vertical'>
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Năm sinh'
                  name='birthDate'
                  layout='vertical'
                  rules={[
                    {
                      required: true,
                      message: 'Trường bắt buộc'
                    }
                  ]}
                >
                  <DatePicker format='DD/MM/YYYY' className='w-full' readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Năm mất' name='deathDate' layout='vertical'>
                  <DatePicker format='DD/MM/YYYY' className='w-full' readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mb-16' gutter={8}>
              <Col span={24}>
                <Form.Item label='Địa chỉ' name='address' layout='vertical'>
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mb-16'>
              <Col span={24}>
                <Form.Item label='Mô tả' layout='vertical' name='description'>
                  <Input.TextArea readOnly />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
          </Form>
        </Col>
      </Row>
    </div>
  )
}
