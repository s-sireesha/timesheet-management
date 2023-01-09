import React from 'react'
import './nav.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
// import Popup from '../popup/popup';



const Nav2 = () => {
  const [visibility,setvisibility]=useState("none")

  // const logout=()=>{
    const popup=()=>{
      if(visibility=="none"){
        setvisibility("")
      }
      else{
        setvisibility("none")
      }
      
    }
  



    const navigate = useNavigate();
    // const [show,sethide]=useState(
    // {
    //         display:{show}
    //     }
    
    // )
    
    
        const logout=()=>{
            // setuserdata("")
            localStorage.removeItem("MyUser")
          navigate("/signin")
        }
  return (
    // <div className={popup}></div>
  <div className='header'>

    <div className={visibility}>
          <div className="popup" >
        <div className='logo'>
            <img src='./images/question.png' alt='log-out'></img>
        </div>
        <h1>you want to signout</h1>
        <div className='buttons'>
        <button className='signout-btn' onClick={logout}>signout</button>
        <button className='cancel-btn' onClick={popup}>cancel</button>
        </div>
       </div>
       </div>
       
    <div className='nav1'>
        <div className='nav-logo'>
            <Link to="/"><img src='./images/Inkprog-logo.png' alt=''></img></Link>
        </div>

        <div className='nav2-menu'>
           <h2><Link to="/">Profile</Link></h2>
           <h2><Link to="../timesheet">Timesheets</Link></h2>
           <h2><Link to="../leave">Apply for leave</Link></h2>
           <h2><Link to="../payslips">Payslips</Link></h2>
           <h2 onClick={popup}>Signout</h2>
        </div>
    </div>

</div>
  )
}

export default Nav2