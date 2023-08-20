/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './schedule.css'
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

function ScheduleList() {

  const [notif, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get('http://localhost:4000/notifications/getNotification');
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotifications();
  }, []);


  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get('http://localhost:4000/schedules/getschedule');
        setScheduleList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSchedule();
  }, []);


  // algorithm
  const [availableSeatsByLocation, setAvailableSeatsByLocation] = useState({});

  useEffect(() => {
    async function fetchBookingLocations() {
      try {
        const response = await axios.get('http://localhost:4000/bookings/countLocationsAlgorithm');
        setAvailableSeatsByLocation(response.data.availableSeatsByLocation);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBookingLocations();
  }, []);

  return (
    <div>
      <div className="sbody">
      <div className="">
        <Navbar/>
        </div><br/><br/>

        <div className='container'><br/>
      <h2>Seat Availability OF Trains</h2><br/>
      {/* <ul>
        {Object.entries(locations).map(([location, availableSeats]) => (
          <li key={location}>
            {location}: {availableSeats}
          </li>
        ))}
      </ul> */}
      <table className='text-left' id='scheduletbl'>
      <thead>
          <tr>
            <th></th>
            <th>Available Seats</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(availableSeatsByLocation).map((location) => (
            <tr key={location}>
              <td style={{fontWeight: "bold"}}>{location}</td>
              <td  style={{textAlign:"center"}}><h1>{availableSeatsByLocation[location]}</h1></td>
            </tr>
          ))}
        </tbody>
      </table><br/><br/>

    </div>
        
        </div>

        <div id='not'>
          <ul>
            {notif.map(n => (
              <li key={n._id}>
                <marquee>
                  <p>Argent Notifications: {n.notification}</p>
                </marquee>
              </li>
            ))}
          </ul>
        </div>
    
    <div className='container'><br/><br/>

    <h2 style={{textAlign:"left"}}>Schedule Table</h2><br/><br/><br/>
    <table className='table table-striped table-hover text-center'>
      <thead>
        <tr>
          <th>Train Name</th>
          <th>Start</th>
          <th>End</th>
          <th>Date</th>
          <th>Time</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {scheduleList.map((schedule) => (
          <tr key={schedule._id}>
            <td>{schedule.trainname}</td>
            <td>{schedule.start}</td>
            <td>{schedule.end}</td>
            <td>{schedule.date}</td>
            <td>{schedule.time}</td>
            <td>LKR{schedule.price}</td>
            <td><a href='/booking'id='abook'>BOOK NOW</a></td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/><br/><br/>   
  </div>

  <Footer/>
  </div>
  );
}

export default ScheduleList;
