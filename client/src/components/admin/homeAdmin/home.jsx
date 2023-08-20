import React from 'react';

import './home.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

function AdminHomePage() {
  return (
    <><NavbarAdmin /><div className='container'><br/>

      <h1 style={{textAlign:"left"}}>Welcome, Admin! - METRA</h1>
      <p>You can manage the site using the bottons below:</p><br/>
      <table className='table' id='admintbl'>
      <tr>
          <td colSpan={2}>
            <a href="/notification"><button id='href' className='btn' style={{width: "1060px"}}>Argent Notifications</button></a>
          </td>
       </tr>
        <tr>
          <td>
            <a href="/scheduleAdmin"><button id='href' className='btn'>Train Schedule</button></a>
          </td>
          <td>
            <a href="/bookingAdmin"><button id='href' className='btn'>Seats Booking Details</button></a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/canteenAdmin"><button id='href' className='btn'>Train Canteen</button></a>
          </td>
          <td>
            <a href="/foodAdmin"><button id='href' className='btn'>Food Ordering Details</button></a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/complaintAdmin"><button id='href' className='btn'>User Complaints</button></a>
          </td>
          <td>
            <a href="/feedbackAdmin"><button id='href' className='btn'>User Feedbacks</button></a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/regiAdmin"><button id='href' className='btn'>User Registration</button></a>
          </td>
          <td>
            <a href="/locationAdmin"><button id='href' className='btn'>Location</button></a>
          </td>
        </tr>
      </table><br/><br/>
    </div>
    <Footer/>
    </>
  );
}

export default AdminHomePage;
