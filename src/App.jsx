import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/Dashboard';
import Homepage from './Components/Homepage';
import Hotels from './Pages/Hotels';
import Users from './Pages/Users';
import UserProfile from './Profiles/UserProfile';
import Notifications from './Pages/Notifications';
import Restprofile from './Profiles/Restprofile';
import EditUser from './Profiles/EditUser';
import EditRest from './Profiles/EditRest';
import OtherRestprofile from './Profiles/OtherRestProfile';
import Menu from './Pages/Menu';
import Addpic from './Profiles/Addpic';
import AprroveReject from './Pages/AprroveReject';
import Payment from './Components/Payment';


function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Router>
      <ToastContainer />
        <div>
          <Routes>
            <Route path='/register' element={<Register />}/> 
            <Route path='/login' element={<Login />}/> 
            <Route path='/' element={<Dashboard />}/> 
            <Route path='/home' element={<Homepage />}/> 
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/menuitems" element={<Menu />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/approvereject" element={<AprroveReject />} />
            <Route path="/Restprofile" element={<Restprofile />} />
            <Route path="/OtherRestprofile/:hotelId" element={<OtherRestprofile />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/edit-rest" element={<EditRest />} />
            <Route path="/addMenu" element={<Menu />} />
            <Route path="/addpic" element={<Addpic />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
  <footer className="mt-auto">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
          <div className="text-sm text-slate-500 font-semibold py-1">
            <div>
              @Nomads_table_ _ Contact:_ _ nomad254@mail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer> 

    </div>
  )
}



export default App