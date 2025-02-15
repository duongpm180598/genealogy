import { enquireScreen } from 'enquire-js'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { Banner } from './Banner'
import Header from './Header'

let defaultIsMobile

enquireScreen((b) => {
  defaultIsMobile = b
})

export function PrivateLayout() {
  const [isMobile, setIsMobile] = useState(defaultIsMobile)

  //   const isAuth = !!getAccessToken()
  //   const [isOpenSidebar, setIsOpenSidebar] = useState(true)

  //   useEffect(() => {
  //     const handleToggleSidebar = () => setIsOpenSidebar((prev) => !prev)

  //     window.addEventListener('TOGGLE_SIDEBAR', handleToggleSidebar)

  //     return () => {
  //       window.removeEventListener('TOGGLE_SIDEBAR', handleToggleSidebar)
  //     }
  //   }, [])

  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b)
    })
  }, [])

  //   if (!isAuth) {
  //     return <Navigate to='/login' />
  //   }
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
