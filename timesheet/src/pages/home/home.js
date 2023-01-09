import React from 'react';
import Nav1 from '../../component/navbars/nav1';
import './home.css'
import {  Link } from "react-router-dom";

const Home = () => {

 
  return (
    <div className='home'>
        <Nav1/>
        <div className='home-con'>
            <div className='home-con-box1'>
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
            <div className='home-con-box2'>
              <img src='./images/Group1.png' alt=''></img>
            </div>
        </div>
    </div>
  )
}

export default Home