import React from 'react'
import './nav.css';
import { Outlet, Link } from "react-router-dom";

const Nav1= () => {
  return (
    <div className='header'>
        <div className='nav1'>
            <div className='nav-logo'>
                <Link to="/"><img src='./images/Inkprog-logo.png' alt=''></img></Link>
            </div>

            <div className='nav1-headings'>
                <h1>TIMESHEETS AND ATTENDENCE MANAGEMENT SOFTWARE</h1>
            </div>
        </div>

    </div>
  )
}

export default Nav1