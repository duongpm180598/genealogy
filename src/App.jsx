import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateLayout } from './layout/PrivateLayout'
import { PublicLayout } from './layout/PublicLayout'
import Event from './pages/Event'
import { GenealogyTree } from './pages/GenealogyTree'
import Home from './pages/Home'
import { EditUserInfo } from './pages/Home/EditUserInfo'
import { UserInfo } from './pages/Home/UserInfo'
import { LoginPage } from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<PublicLayout />}>
          <Route path='login' element={<LoginPage />} />
        </Route>

        {/* Private Routes */}
        <Route path='/' element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path='/thong-tin/:id' element={<UserInfo />} />
          <Route path='/form-thong-tin' element={<EditUserInfo />} />
          <Route path='/form-thong-tin/:id' element={<EditUserInfo />} />

          <Route path='/pha-do' element={<GenealogyTree />} />
          <Route path='/su-kien' element={<Event />} />
        </Route>
        {/* Fallback Route */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
