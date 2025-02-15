import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className='content-wrapper'>
        <main className='content-wrapper__2'>
        <Outlet />
      </main>
    </div>
  )
}
