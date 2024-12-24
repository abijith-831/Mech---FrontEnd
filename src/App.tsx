import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App:React.FC = () => {
  return (
    <div>
      <Routes>
          <Route path='/*' element={<UserRoutes/>}/>
      </Routes>
      <ToastContainer
        position="top-right"      
        autoClose={2000}         
        hideProgressBar={false}  
        newestOnTop={false}       
        closeOnClick={true}       
        pauseOnHover={true}      
        draggable={true}         
                   
      />
    </div>
  )
}

export default App
