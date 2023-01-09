import React, { useEffect } from 'react'
import { useState } from 'react'
import './leave.css'
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import Nav2 from '../../component/navbars/nav2'
import axios from 'axios'

const Leave = () => {
   // const leaveinfo;
   const [leaves,setleaves]=useState([])
   
  let userinfo=JSON.parse(localStorage.getItem("MyUser"))

// ---------------------------------------------------------------------------------
  // looping for dynamic input fields
  const nofield=[]
  for(let i=0 ;
    nofield.length<10-leaves.length;i++){
    nofield.push("item"+i)
    // console.log(nofield)
  }

// ---------------------------------------------------------------------------------
  // sending leaves to database
  const [leave,setleave]=useState({
    email:userinfo.email,
    subject:"",
    date:""
  })

  const collect=(e)=>{
    const {name,value}=e.target;
    setleave(
      {
        ...leave,
        [name]:value
      }
    )
    setempty()
}

const submitleave=async(e)=>{
  e.preventDefault();
  await axios.post("https://timesheets-project.herokuapp.com/api/signinup/leave",leave)
  .then(res=>console.log(res.data.message))
  getleave()
}


// ---------------------------------------------------------------------------------
// getting leaves info of this user
  // empty input field after submit leaves
  const [empty,setempty]=useState("")
 
  // geting leave data
  const getleave=async()=>{
 await axios.post("https://timesheets-project.herokuapp.com/api/signinup/leaves",leave)
    .then(res=>{
      setleaves(res.data.user)
    })
    setempty("")
  }
  useEffect(()=>{
    getleave()
  },[])
  

  // -------------------------------------------------------------------------------
      //calendar function
  const [value, onChange] = useState(new Date());
  return (
    <div>
        <Nav2/>
        <div className='leave'>
            <div className='leave-box1'>
            <div className="ts1">
        <div className="details">
          <h3>Employee Name :{userinfo.email}</h3>
          <h3>Employee ID : </h3>
        </div>
        <div className="calendar">
          <Calendar onChange={onChange} value={value} />
        </div>
        <Link to="../">PROFILE SECTION</Link>
      </div>
            </div>

            {/*  */}
            <div className='leave-box2'>
                <div className='leave-box2-heading'>
                    <h1>LEAVE APPLICATION</h1>
                </div>

                <div className='leave-box2-main'>
                    <div className='leaves-to-submit'>

                    {
                          leaves.map((fields,i)=>{
                            return(
                              <div className='leave-input-container'>
                                <form onSubmit={submitleave} className="leave-input-container" key={i}>
                                <input type="text" name='date' value={fields.date} onChange={collect} className="date-field"></input>
                                <input type="text" className='descrip' placeholder='Reason for Leave' name='subject'  value={fields.subject} onChange={collect}></input>
                                <div className='button' >Applied</div>
                                </form>
                                </div>
                            )
                          })
}

                        {
                          nofield.map((fields,i)=>{
                            return(
                              // <div className='leave-input-container'>
                                <form onSubmit={submitleave} className="leave-input-container" key={i}>
                                <input type="date" name='date' onChange={collect} required className="date-field" value={empty}></input>
                                <input type="text" className='descrip' placeholder='Reason for Leave' name='subject'  value={empty} onChange={collect} required></input>
                                <button type="submit">Apply</button>
                                </form>
                                // </div>
                            )
                          })
}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Leave