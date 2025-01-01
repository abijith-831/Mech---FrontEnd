import { useEffect, useState } from "react"
import Sidebar from "../../components/admin/Sidebar"
import { getUsers } from "../../services/admin/adminApi"


interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
}



const UserList = () => {

  const [users , setUsers ] = useState<User[]>([])

  useEffect(()=>{
      const getUserDatas = async()=>{
        try {
          const response = await getUsers()

          setUsers(response.data)
        } catch (error) {
          
        }
      }

      getUserDatas()
  },[])

  console.log('sdfsd',users);
  

  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 p-6 bg-[#f8fafc] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#88c065]">User List</h2>
      <div className="overflow-x-auto bg-white shadow-md ">
        <table className="min-w-full table-auto">
          <thead className="bg-[#1a202c] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="py-3 px-6">{user.username}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.isVerified ? "Verified" : "Not Verified"}</td>
                    <td className="py-3 px-6">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Actions</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center">No users found</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default UserList
