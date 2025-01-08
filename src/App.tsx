import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import MechRoutes from './routes/MechRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{
        vertical: 'top', 
        horizontal: 'right', 
      }}
      autoHideDuration={2000}
    >
      <div>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/mech/*' element={<MechRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
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
    </SnackbarProvider>
  );
}

export default App;
