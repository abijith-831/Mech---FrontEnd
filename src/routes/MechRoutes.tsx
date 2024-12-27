import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/mech/LandingPage'
import MechLogin from '../pages/mech/MechLogin'
import MechSignUp from '../pages/mech/MechSignUp'
import RegisterPage from '../pages/mech/RegisterPage'


const MechRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<MechLogin/>}/>
        <Route path='/signup' element={<MechSignUp/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        
      </Routes>
    </div>
  )
}

export default MechRoutes
