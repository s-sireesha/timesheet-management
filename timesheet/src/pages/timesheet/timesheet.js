import React from 'react'

import { useState } from 'react';
import Calendar from 'react-calendar';
import Nav2 from '../../component/navbars/nav2'
import './timesheet.css'
import 'react-calendar/dist/Calendar.css';

const Timesheet = () => {
    const [value, onChange] = useState(new Date());
  return (
    <div className='timesheet'>
        <Nav2/>

        <div className='timesheet-container'>
            <div className='calender'>
                
                <div className='calender-heading'>
                <h2>Employee Name</h2>
                <h2>Employee-ID</h2>
                </div>

                <div>
                <div>
      <Calendar onChange={onChange} value={value} />
    </div>
                </div>

            </div>

            <div className='weak'>

            </div>

            <div className='next-weak'>

            </div>


            <div className='weaksshower'>

            </div>
        </div>

    </div>
  )
}

export default Timesheet