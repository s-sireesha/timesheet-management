import React, { useState } from 'react'
import './signin.css'
import { Link} from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import Nav1 from '../../component/navbars/nav1';
// import Popup from "../../component/popup/popup"
import axios from 'axios';


const AdminSignin = ({setadmin}) => {
  const navigate = useNavigate();
  const [logdata,setLogdata]=useState(
    {
      email:"",
      password:""
    }
  );

  const getdata=(e)=>{
    const {name,value}=e.target;
    setLogdata(
  {
    ...logdata,
    [name]:value
  }
    );
    console.log(logdata)
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
   await axios.post("http://localhost:4000/api/admin/login",logdata)
    // .then(res=> console.log(res))
    .then(res=> {
      alert(res.data.message)
      setadmin(res.data.user)
      console.log(res)
      console.log()
      navigate("/adminhome")
    })
  }


  return (
    <div>
   
        <Nav1/>
         <div className='signin'>
            <div className='signin-box1'>
            <div className='button '>
                <Link to="../admin/signup">
                <button >EMPLOYEER REGISTRATION</button>
                </Link>
              </div>
              <div className='button'>
                <Link to="../admin/signin">
                <button className='login'>EMPLOYEER LOGIN</button>
                </Link>
              </div>
            </div>
            <div className='signin-box2'>
              <form onSubmit={onSubmit}>
                <h2>Admin Login</h2>
                <input type='email' name='email' placeholder='Email' onChange={getdata}></input>
                <input type='password' name='password' placeholder='Password' onChange={getdata}></input>
                <h3>Already a member? <span>Login</span></h3>
                <button>Log-in</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default AdminSignin