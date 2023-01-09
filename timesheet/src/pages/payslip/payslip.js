import React, { useState } from 'react'
import './payslip.css'
import { useEffect } from 'react'
import Nav2 from '../../component/navbars/nav2'
import axios from "axios"

const Payslip = () => {
    const months=["January","February","March","April","May","June","July","August"]

    const [slips,setslips]=useState("")

    // getting user data from database and updating local storage
    let gettinguser = JSON.parse(localStorage.getItem("MyUser"));
    let userid = gettinguser._id;
    let payslipss=gettinguser.payslips
    // console.log(payslipss[1].payslip)

    // getting user
    const getuserdata = async () => {
      const response = await axios.get(
        `https://timesheets-project.herokuapp.com/api/signinup/singleuser/${userid}`
      );
      const userdetail = response.data;
      // setvalue(userdetail);
      localStorage.setItem("MyUser", JSON.stringify(userdetail));
    };
  
    useEffect(() => {
      getuserdata();
    },[]);
  return (
    <div>
        <Nav2></Nav2>

        <div className='payslip'>
            <div className='payslip-month'>

                <div className='payslip-month-userdetail'>
                  <h2>Employee Name</h2>  
                  <h2>Employee ID</h2>  
                </div>

                <div className='payslip-month-box'>
                  {
                    months.map((month,i)=>{
                        return(
                            <div key={i} onClick={()=>setslips(payslipss[i].payslip)}>
                            <h6>{months[i]}</h6>
                        </div>
                        )
                    })
                   }
                </div>
            </div>

            {/* payslip preview box */}
            <div className='payslip-preview'>
                <img src={slips} alt=''></img>
            </div>



            <div className='payslip-month'>

<div className='payslip-month-userdetail'>
  <h2> {gettinguser.email}</h2>  
  <h2> {gettinguser.employeeid}</h2>  
</div>

<div className='payslip-month-box'>
  
            <div>
            <button> <a download="FILENAME.png" href={slips}>Download</a></button>
        </div>
</div>
</div>
        </div>

    </div>
  )
}

export default Payslip