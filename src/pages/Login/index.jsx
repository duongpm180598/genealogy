import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginWithCredential } from '../../services/auth.service'

export const LoginPage = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    await login(values)
  }

  const login = async (payload) => {
    try {
      await loginWithCredential(payload)
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' }
    }
  }

  return (
    <div className='login-form'>
      <h3>Phần mềm gia phả</h3>
      <Form
        name='normal_login'
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your Username!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
