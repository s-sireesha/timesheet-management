import React, { useState } from 'react'
import './signup.css'
import axios from "axios"
import { Link } from "react-router-dom";
import Nav1 from '../../component/navbars/nav1';
import { useNavigate  } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  // posting data
const[newUser,setnewUser]=useState(
  {
    fullname:"",
    employeeid:"",
    email:"",
    password:""
  }
  );
  
  const collectinfo=(e)=>{
    const {name,value}=e.target;
    setnewUser(
  {
    ...newUser,
    [name]:value
  }
    )
    console.log(newUser)
  }

  // if (!newUser.fullname || !newUser.employeeid || !newUser.email || !newUser.password) {
  //   // res.send({message:"Please fill all the fields!"});
  //   alert("wrong")
  // }
  var upperCaseLetters = /[A-Z]/g;
  
  const sendData=async(e)=>{
    e.preventDefault();

     if (!newUser.fullname || !newUser.employeeid || !newUser.email || !newUser.password) {
    alert("please enter all the fields")
  }

  else if(newUser.fullname.length < 4){
    alert("please enter the correct name")
  }  

  else if(newUser.password.length < 12){
    alert("please enter correct password length should be more then 12 char")
  }  

  

 else if(newUser.password.match(!upperCaseLetters)){
    alert("one CAPITAL letter required")
  }
  // else if(newUser.password.length < 12){
  //   alert("please enter correct password length should be more then 12 char")
  // }  

else{ await axios.post("https://timesheets-project.herokuapp.com/api/signinup",newUser)

    .then(res=> 
   { let message=res.data.message;
    alert(message)
    if(message==="success"){
      navigate("/signin")
    }
    setnewUser(
      {
        fullname:"",
        employeeid:"",
        email:"",
        password:""
      }
    )
  }
    )}

  }
  
  return (
    <div>
        <Nav1/>
         <div className='signup'>
            <div className='signup-box1'>
              <div className='button '>
                <Link to="../signup">
                <button className='regester'>EMPLOYEE REGISTRATION</button>
                </Link>
              </div>
              <div className='button'>
                <Link to="../signin">
                <button>EMPLOYEE LOGIN</button>
                </Link>
              </div>
            </div>

            <div className='signup-box2'>
              <form onSubmit={sendData}>
                <h2>REGISTRATION FORM</h2>
                <input type='text'name='fullname' value={newUser.fullname} placeholder='Full Name' onChange={collectinfo} ></input>
                <input type='text' name='employeeid' value={newUser.employeeid} placeholder='Employee ID' onChange={collectinfo}></input>
                <input type='email' name='email' value={newUser.email} placeholder='Email' onChange={collectinfo}></input>
                <input type='password' name='password' value={newUser.password} placeholder='Password' onChange={collectinfo}></input>
                <h3>Already a member? <Link to="../signin"><span>Login</span></Link></h3>
                <button type='submit'>Register</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Signup