import { Button, Col, DatePicker, Divider, Form, Input, message, Row, Select, Upload } from 'antd'
import dayjs from 'dayjs'
import { PlusCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMemberById } from '../../../services/members.service'

export const EditUserInfo = () => {
  const [form] = Form.useForm()
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {/* <Icon type={loading ? 'loading' : 'plus'} /> */}
      <div className='ant-upload-text'>Ảnh thành viên</div>
    </div>
  )

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

  if (loading) return null

  return (
    <div className='card'>
      <div className='flex items-center justify-end'>
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

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader mb-16'
            showUploadList={false}
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Tên gọi khác' name='nickname' layout='vertical'>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Vị trí trong họ' name='position' layout='vertical'>
                  <Select
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
                    options={[
                      { label: 'Nam', value: 'male' },
                      { label: 'Nữ', value: 'famale' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label='Số điện thoại' name='phone' layout='vertical'>
                  <Input />
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
                  <DatePicker format='DD/MM/YYYY' className='w-full' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Năm mất' name='deathDate' layout='vertical'>
                  <DatePicker format='DD/MM/YYYY' className='w-full' />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mb-16' gutter={8}>
              <Col span={24}>
                <Form.Item label='Địa chỉ' name='address' layout='vertical'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row className='mb-16'>
              <Col span={24}>
                <Form.Item label='Mô tả' layout='vertical' name='description'>
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row justify='end'>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Lưu thông tin
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
