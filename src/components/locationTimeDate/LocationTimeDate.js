import React from 'react'
import "./locationtimedate.style.scss";
import moment from 'moment-timezone';

function LocationTimeDate({location, timestamp, timezone}) {
 
  let time = moment.unix(timestamp).tz(timezone).format('HH:mm')
  let date = moment.unix(timestamp).tz(timezone).format('dddd MMMM Do YYYY')
 
  return (
    <div className='locationTimeDate'>
        <div className='locationTimeDate__location'>{location}</div>
        <div className='locationTimeDate__time'>{time}</div>
        <div className='locationTimeDate__date'>{date}</div>
    </div>
  )
}

export default LocationTimeDate