import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Nav2 from "../../component/navbars/nav2";
import 'react-calendar/dist/Calendar.css';
import "./timesheet.css";

const Timesheet= () => {

  // getting user id from localstorage
  let gettinguser=JSON.parse(localStorage.getItem("MyUser"))
  let userid=gettinguser.email;
  



// ciollecting timesheet info and submitting
  const date=new Date();
  let todaydate=date.getDate()+'-'+parseInt(date.getMonth()+1)+'-'+date.getFullYear();

  const [updatesheet,setupdatesheet]=useState({
    email:userid,
    monday:"",
    tuesday:"",
    wednesday:"",
    thursday:"",
    friday:"",
    saturday:"",
    sunday:"",
    dates:`${todaydate}`
  })

const store=(e)=>{
  const {name,value}=e.target;

  setupdatesheet(
    {
      ...updatesheet,
      [name]:value
    }
  )
}


  // submitting 
  const tsheetsubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://timesheets-project.herokuapp.com/api/signinup/timesheet",updatesheet)
    .then((res) => alert(res.data.message))
  setupdatesheet({
    monday:"",
    tuesday:"",
    wednesday:"",
    thursday:"",
    friday:"",
 
  })

 
};

  //calendar function
  const [value, onChange] = useState(new Date());


  // day
  
  const days=["sunday","monday","tuesday","wesnesday","thursday","friday","saturday"]
  let currentday=date.getDay();
  // let currentday=12;
  
  let getday=days[currentday]


  const[onday,setonday]=useState(true)
  useEffect(() => {
   if(getday==="friday"){
    setonday(false)
   }
  }, [])   


  // changing weeks on title
    let count;

    let dates=date.getDate()
  
    switch(true){
      case dates<9:
      count=1
      break;

      case dates>9 && dates<15:
      count=2
      break;

      case dates>15 && dates<22:
      count=3
      break;

      default:
        count=4
    }





  return (

    <>
    <Nav2/>
  
    <div className="timesheets">
      <div className="ts1">
        <div className="details">
          <h3>Employee Name : {userid}</h3>
          <h3>Employee ID : </h3>
        </div>
        <div className="calendar">
          <Calendar onChange={onChange} value={value} />
        </div>
        <Link>PROFILE SECTION</Link>
      </div>


      

       <div className="ts2">
        <h2>WEEK{count}</h2>
        <div className="grid">
        <div className="weeks">
          <h4>Monday</h4>
          <h4>Tuesday</h4>
          <h4>Wednesday</h4>
          <h4>Thursday</h4>
          <h4>Friday</h4>
        </div>

     <form onSubmit={tsheetsubmit}>
          <input type="checkbox" readOnly={onday} required/>
          <input type="tel" readOnly={onday} required name="monday" onChange={store}/>

          <input type="checkbox" readOnly={onday} required/>
          <input type="tel" readOnly={onday} required name="tuesday" onChange={store}/>

          <input type="checkbox" readOnly={onday} required/>
          <input type="tel" readOnly={onday} required name="wednesday" onChange={store}/>

          <input type="checkbox" readOnly={onday} required/>
          <input type="tel" readOnly={onday} required name="thursday" onChange={store}/>

          <input type="checkbox" readOnly={onday} required/>
          <input type="tel" readOnly={onday} required name="friday" onChange={store}/>

          <button type="submit">submit</button>
          </form>

        </div>
      
      </div> 
      <div className="ts3">
        <h2>WEEK{count+1}</h2>
        <button>On next Friday</button>
      </div>
      <div className="ts4">
      <button className={count===2?"presentweek":""}>Week 2</button>
      <button className={count===3?"presentweek":""}>Week 3</button>
      <button className={count===4?"presentweek":""}>Week 4</button>
      </div>
    </div>
    </>
  );
};

export default Timesheet;

// localStorage.setItem("user",me);
//fetch object
// console.log(localStorage.getItem("user")); // will return "[object Object]"