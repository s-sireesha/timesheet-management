import React from 'react'
import './nav.css'
import {  Link } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';
// import Popup from '../popup/popup';


// const [visibility,setvisibility]=useState()

// const signout=()=>{

// }
const nav2 = ({setuserdata}) => {
// 
const navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem("MyAdmin")
    navigate("/admin/signin")
  }
  return (
    <div className='header'>
         {/* <Popup setuserdata={setuserdata}/> */}
    <div className='nav1'>
        <div className='nav-logo'>
            <Link to="../adminhome"><img src='./images/Inkprog-logo.png' alt='logo'></img></Link>
        </div>

        <div className='nav2-menu'>
           <h2><Link to="../Notification">Notifi</Link></h2>
           <h2 onClick={logout}><Link>Signout</Link></h2>
        </div>
    </div>


    {/*  */}
    <div className='notifi-history'>
      
    </div>
</div>
  )
}

export default nav2