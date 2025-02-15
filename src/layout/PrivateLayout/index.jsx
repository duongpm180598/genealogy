import { enquireScreen } from 'enquire-js'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { Banner } from './Banner'
import Header from './Header'
import { getUser } from '../../services/localStorage'

let defaultIsMobile

enquireScreen((b) => {
  defaultIsMobile = b
})

export function PrivateLayout() {
  const [isMobile, setIsMobile] = useState(defaultIsMobile)
  const user = getUser()
  const isAuth = user && JSON.parse(user).username

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

  if (!isAuth) {
    return <Navigate to='/login' />
  }
  return (
    <Fragment>
      <Header isMobile={isMobile} />
      <div className='content-wrapper'>
        <main className='content-wrapper__2'>
          <Banner />
          <Outlet />
        </main>
      </div>
    </Fragment>
  )
}
