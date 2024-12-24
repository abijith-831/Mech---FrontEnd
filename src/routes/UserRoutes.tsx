import { Route, Routes } from 'react-router-dom'
import Home from '../pages/user/Home'
import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'
import Signup from '../pages/user/SignUp'
import Login from '../pages/user/Login'


const userRoutes = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signUp' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default userRoutes
