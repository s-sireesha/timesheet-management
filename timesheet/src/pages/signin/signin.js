import React, { useState } from 'react'
import './signin.css'
import { Link} from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
import Nav1 from '../../component/navbars/nav1';
// import Popup from "../../component/popup/popup"
import axios from 'axios';


const Signin = ({setuserdata}) => {
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
  }

  const onSubmit=async(e)=>{
    e.preventDefault();

    if(logdata.password.length<12){
      alert("please enter the correct password")
    }
  else{
    await axios.post("https://timesheets-project.herokuapp.com/api/signinup/login",logdata)
    // .then(res=> console.log(res))
    .then(res=> {
      alert(res.data.message)
      console.log(res.data.message)
      setuserdata(res.data.user)
      navigate("/")
    })
  }
  }


  return (
    <div>
   
        <Nav1/>
         <div className='signin'>
            <div className='signin-box1'>
            <div className='button '>
                <Link to="../signup">
                <button >EMPLOYEE REGISTRATION</button>
                </Link>
              </div>
              <div className='button'>
                <Link to="../signin">
                <button className='login'>EMPLOYEE LOGIN</button>
                </Link>
              </div>
            </div>
            <div className='signin-box2'>
              <form onSubmit={onSubmit}>
                <h2>Employee Login</h2>
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

export default Signin