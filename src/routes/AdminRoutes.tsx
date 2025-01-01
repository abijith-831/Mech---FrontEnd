import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/admin/Dashboard"
import UserList from "../pages/admin/UserList"
import MechLists from "../pages/admin/MechLists"
import AdminLogin from "../pages/admin/AdminLogin"

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminLogin/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/userList' element={<UserList/>} />
        <Route path='/mechLists' element={<MechLists/>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
