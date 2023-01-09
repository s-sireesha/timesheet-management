import React, { useState } from 'react'
import './signup.css'
import axios from "axios"
import { Link } from "react-router-dom";
import Nav1 from '../../component/navbars/nav1';
// import { useNavigate  } from 'react-router-dom';


const AdminSignup = () => {
  // const navigate = useNavigate();
  // posting data
const[newAdmin,setnewAdmin]=useState(
  {
    fullname:"",
    employeeid:"",
    email:"",
    password:""
  }
  );
  
  const collectinfo=(e)=>{
    const {name,value}=e.target;
    setnewAdmin(
  {
    ...newAdmin,
    [name]:value
  }
    )
    console.log(newAdmin)
  }
  
  const sendData=async(e)=>{
    e.preventDefault();
  await axios.post("http://localhost:4000/api/admin/register",newAdmin)
    // console.log(toserver.data)
    .then(res=> alert(res.data.message),
    // navigate("/admin/signin")
    )
    setnewAdmin(
      {
        fullname:"",
        // employeeid:"",
        email:"",
        password:""
      }
     
    )
   

  }
  
  return (
    <div>
        <Nav1/>
         <div className='signup'>
            <div className='signup-box1'>
              <div className='button '>
                <Link to="../admin/signup">
                <button className='regester'>EMPLOYEER REGISTRATION</button>
                </Link>
              </div>
              <div className='button'>
                <Link to="../admin/signin">
                <button>EMPLOYEER LOGIN</button>
                </Link>
              </div>
            </div>

            <div className='signup-box2'>
              <form onSubmit={sendData}>
                <h2>REGISTRATION FORM</h2>
                <input type='text'name='fullname' value={newAdmin.fullname} placeholder='Full Name' onChange={collectinfo} ></input>
                <input type='email' name='email' value={newAdmin.email} placeholder='Email' onChange={collectinfo}></input>
                <input type='password' name='password' value={newAdmin.password} placeholder='Password' onChange={collectinfo}></input>
                <h3>Already a member? <Link to="../signin"><span>Login</span></Link></h3>
                <button type='submit'>Register</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default AdminSignup