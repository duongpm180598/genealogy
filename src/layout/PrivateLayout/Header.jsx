import { Col, Dropdown, Row, Space } from 'antd'
import { enquireScreen } from 'enquire-js'
import { User } from 'lucide-react'
import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal'
  }

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' })
    })
  }

  render() {
    const items = [
      {
        label: <a>Đăng xuất</a>,
        key: '0'
      }
    ]

    return (
      <div id='header' className='header'>
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id='logo' to='/'>
              <img src={logo} alt='logo' />
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0} className='header-right flex items-center justify-end'>
            <div className='flex items-center gap-16'>
              <Link to='/'>Phả hệ</Link>
              <Link to='/pha-do'>Phả đồ</Link>
              <Link to='/su-kien'>Sự kiện</Link>
              <Dropdown
                className='menu'
                menu={{
                  items
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <User />
                    09833239123
                  </Space>
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header
