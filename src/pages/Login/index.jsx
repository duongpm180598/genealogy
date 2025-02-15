import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const { username, password } = values
    await login(username, password)
  }

  const login = async (username, password) => {
    try {
      const usersCollection = collection(db, 'users')
      const q = query(usersCollection, where('username', '==', username))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error('Username không tồn tại')
      }

      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()

      const isPasswordCorrect = comparePasswords(userData.password, password) // Hàm comparePasswords tự viết (sử dụng bcrypt chẳng hạn)

      if (!isPasswordCorrect) {
        throw new Error('Username hoặc password không chính xác')
      }
      // return { success: true, message: 'Đăng nhập thành công.', user: { id: userDoc.id, ...userData } } // Trả về thông tin user
      navigate('/')
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      return { success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' }
    }
  }

  // Hàm so sánh password (ví dụ với bcrypt)
  const comparePasswords = (password, enteredPassword) => {
    // const hashedPassword = CryptoJS.MD5(enteredPassword).toString()
    // console.log(hashedPassword)
    return password === enteredPassword
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
