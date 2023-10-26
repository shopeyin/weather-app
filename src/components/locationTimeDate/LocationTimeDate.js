import React from 'react'
import "./locationtimedate.style.scss";
import moment from "moment"
function LocationTimeDate({location, timestamp}) {
    let dateObj = new Date(timestamp * 1000)
    let hours = dateObj.getUTCHours().toString().padStart(2,0)
  return (
    <div className='locationTimeDate'>
        <div className='locationTimeDate__location'>{location}</div>
        <div className='locationTimeDate__time'>{hours}</div>
        <div className='locationTimeDate__date'>Thursday, 31 August, 2023</div>
    </div>
  )
}

export default LocationTimeDate