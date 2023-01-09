import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import Nav1 from "./component/navbars/nav1"
// import Nav2 from "./component/navbars/nav2"
import Home from "./pages/home/home"
import Signup from "./pages/signup/signup"
import Signin from "./pages/signin/signin"
import Profile from "./pages/profile/profile"
// import Adminome from "./adminpages/home/home"
import AdminSignup from "./adminpages/adminsignup/signup"
import AdminSignin from "./adminpages/adminsignin/signin"
import Timesheet from './pages/tsheet/timesheet'
import Leave from './pages/leavepage/leave'

import Nav2 from './component/navbars/nav2';
import { useState,useEffect } from 'react';

// import Adminhome from './adminpages/adminhome/adminhome';
import AdminPro from './adminpages/adminhome/Adminpro';
import Notifications from './adminpages/notification/notification';
import Payslip from './pages/payslip/payslip';







function App() {
  const [user,setuserdata]=useState({})
  const [admin,setadmin]=useState({})

  useEffect(() => {
    setuserdata(JSON.parse(localStorage.getItem("MyUser")));
    setadmin(JSON.parse(localStorage.getItem("MyAdmin")));
  }, [])   

  const updateuser=(users)=>{
    localStorage.setItem("MyUser",JSON.stringify(users))
    setuserdata(users)
  }

  // admin data store ih local storage
  const updateadmin=(admin)=>{
    localStorage.setItem("MyAdmin",JSON.stringify(admin))
    setadmin(admin)
  }
  return (
    <div className="App">
         <BrowserRouter>
      <Routes>
        <Route>
        {/* <Route index element={<Nav2/>}/> */}
          <Route path="/" element={user && user._id?<Profile user={user} setuser={setuserdata} updateuser={updateuser}/>:<Home/>}/>
           <Route path="payslips" element={user && user._id?<Payslip/>:<Signin setuserdata={updateuser}/>}/>





          <Route path="signin" element={<Signin setuserdata={updateuser}/>} />


          
          <Route path="signup" element={<Signup/>} />
          <Route path="timesheet" element={user && user._id?<Timesheet/>:<Signin setuserdata={updateuser}/>} />
          <Route path="leave" element={user && user._id?<Leave/>:<Signin setuserdata={updateuser}/>} />
          {/* <Route path="admin" element={<Adminome/>} /> */}
          <Route path="admn" element={<Nav2 />} />
          <Route path="admin/signin" element={<AdminSignin setadmin={updateadmin}/>} />
          <Route path="admin/signup" element={<AdminSignup/>} />
          {/* <Route path="adminhome" element={admin && admin._id ?<Adminhome/>:<AdminSignin/>} /> */}
          <Route path="adminhome" element={admin && admin._id ?<AdminPro/>:<AdminSignin/>} />
          <Route path="Notification" element={admin && admin._id ?<Notifications/>:<AdminSignin/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
