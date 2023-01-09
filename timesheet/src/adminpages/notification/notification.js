import React, { useState,useEffect } from 'react'
import './notification.css'
import Nav2 from '../adminnav/nav2'
import axios from 'axios'
const Notifications = () => {

  // getting timesheet notification
    const [notifi,getnotifi]=useState(null)

    // getting data from database
  const workoutdarta=async()=>{
    const response=await axios.get("http://localhost:4000/api/signinup/singleuser");
    const data=response.data
    getnotifi(data);
    console.log(notifi)

  }

//   const [notifi,getnotifi]=useState({})
useEffect(() => {
    workoutdarta();
}, [])


// passing id
// const [display,setdisplay]=useState()

const display={
    display:"none"
}
const[id,setid]=useState("")
// updatin data on click
const updatedetail=async()=>{
  // e.preventDefault();
  console.log(`${id}`)
await axios.patch(`http://localhost:4000/api/signinup/hidenotifi/${id}`,display)
// console.log(`${id}`)

.then(res=> {
  console.log(res.data.message)
})
workoutdarta()
}

  // getting timesheet notification
  const [leavenotifi,getleavenotifi]=useState(null)

  // getting data from database
const leavenotification=async()=>{
  const response=await axios.get("http://localhost:4000/api/admin/leavesnotifi");
  const data=response.data
  getleavenotifi(data);
  console.log(notifi)
}

useEffect(()=>{
  leavenotification()
},[])


// payslip uploading
// converting bindata to string
const [profilepic,setprofilepic]=useState('');

const uploadImage=(e)=>{
    setprofilepic(e.target.files[0]);
    console.log(profilepic)
}


const headConfig={
    'content-type' :'multipart/form-data'
}


const handlesubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('photo',profilepic);
    axios.post(`http://localhost:4000/api/admin/payslip/upload/`,formData,headConfig)
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err)
    });
}



  return (
    <>
    <Nav2></Nav2>
    <div className='adminhome'>
        <div className='notification'>
            <div className='heading'>timesheets-Notifications</div>
            <div className='cards'>

            {/* notification card */}

            {
                notifi && notifi.map((item,i)=>{
                    return(
                        <div className='notifi-card' style={{display:`${item.display}`}} key={item._id}>
                            <h3 className='cross' onClick={()=>{
                              return(
                                setid(`${item._id}`),
                                updatedetail()
                              )
                            }}>X</h3>
                <h5>{item.email} submited the timesheet</h5>
                <div>
                    <h5>monday:{item.monday}</h5>
                    <h5>tuesday:{item.tuesday}</h5>
                    <h5>wednesday:{item.wednesday}</h5>
                    <h5>thursday:{item.thursday}</h5>
                    <h5>friday:{item.friday}</h5>
                    <h5>saturday:{item.saturday}</h5>
                    <h5>sunday:{item.sunday}</h5>
                </div>
            </div>
                    )
                })
            }
            </div>
            
        </div>

        {/* <div className='history'>

        </div> */}


<div className='notification'>
            <div className='heading'>leaves Notifications</div>
            <div className='cards'>

            {/* notification card */}

            {
                leavenotifi && leavenotifi.map((item,i)=>{
                    return(
                        <div className='notifi-card' style={{display:`${item.display}`}} key={item._id}>
                            <h3 className='cross' onClick={()=>{
                              return(
                                setid(`${item._id}`),
                                updatedetail()
                              )
                            }}>X</h3>
                <h5>{item.email} applied for leave</h5>
                <div>
                 
                </div>
            </div>
                    )
                })
            }
            </div>
            
        </div>

    </div>


   
    </>
  )
}

export default Notifications