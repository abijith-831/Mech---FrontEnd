import { Route, Routes } from 'react-router-dom'
import Home from '../pages/user/Home'
import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'

const userRoutes = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default userRoutes
