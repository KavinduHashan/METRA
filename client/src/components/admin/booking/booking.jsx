/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './booking.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(50);

  useEffect(() => {
    async function fetchBookings() {
      const response = await axios.get('http://localhost:4000/bookings/getBookings');
      setBookings(response.data);
    }
    fetchBookings();
    ;
  }, []);


  // algorithm
  const [availableSeatsByLocation, setAvailableSeatsByLocation] = useState({});

  useEffect(() => {
    async function fetchBookingLocations() {
      try {
        const response = await axios.get('http://localhost:4000/bookings/countLocations');
        setAvailableSeatsByLocation(response.data.availableSeatsByLocation);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBookingLocations();
  }, []);


  async function handleDeleteBooking(id) {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this booking?');
  
      if (confirmed) {
        await axios.get(`http://localhost:4000/bookings/deleteBooking/${id}`);
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== id));
        setAvailableSeats(prevAvailableSeats => prevAvailableSeats + 1);
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <><NavbarAdmin /><div className=''><br />

      <div className=''><br />
        <h2 style={{ textAlign: "center" }}>Seat Availability OF Trains</h2><br />
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
        </table>

      </div><br /><br />

      <h2 style={{ textAlign: "left" }}>Bookings List</h2><br /><br />
      {/* <p>Available seats: 50/<b>{availableSeats}</b></p> */}
      <table className='table table-striped table-hover'>
        <thead>
          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Contact Num</th>
            <th>T: Name</th>
            <th>Time</th>
            <th>Arriving Location</th>
            <th>Departure Location</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{booking.trainname}</td>
              <td>{booking.time}</td>
              <td>{booking.start}</td>
              <td>{booking.end}</td>
              <td>{booking.date}</td>
              <td>{booking.Pay}</td>
              <td>
                <button id='delclinibtn' className='btn' onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br/><Footer/></>
  );
}

export default BookingList;
