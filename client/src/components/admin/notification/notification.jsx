import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './notification.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

const Schedule = () => {
  const [id, setId] = useState('');
  const [notification, SetNotification] = useState("");

  const [viewnotif, setView] = useState([]);

  useEffect(() => {
    getNotifi();
  }, []);

  const getNotifi = async () => {
    const result = await axios.get('http://localhost:4000/notifications/getNotification');
    setView(result.data);
  };

  const addNotification = async () => {
    await axios.post('http://localhost:4000/notifications/addnotification', {
        notification: notification,
    });
    getNotifi();
  };

  const editNotification= async (id) => {
    const result = await axios.get(`http://localhost:4000/notifications/editnotification/${id}`);
    setId(result.data._id);
    SetNotification(result.data.notification);
  };

  const updateNotification = async () => {
    await axios.post(`http://localhost:4000/notifications/updatenotification/${id}`, {
        notification,

    });
    getNotifi('');
    SetNotification('');
    window.location.href = "./notification";
  };

  const deleteNotification = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
    await axios.get(`http://localhost:4000/notifications/deletenotification/${id}`);
    getNotifi();
      }
  };


  return (
    <><NavbarAdmin /><div className='container'><br />
      <h2>Argent Notification</h2><br /><br />
      <section className='cantten'>
        <table className='table table-borderless'>
          <tbody style={{ width: "100px" }}>
            <tr>
              <td><label>Train Name:</label></td>
              <td><input type="text" className='form-control' placeholder='ex: e-Samudra'  value={notification} onChange={(e) => SetNotification(e.target.value)} /></td>
            </tr>
            <tr>
              <td></td>
              <td>{id ? <button className='form-control' id='cupbtn' onClick={updateNotification}>Update</button> : <button className='form-control' id='caddbtn' onClick={addNotification}>Add</button>}</td>
            </tr>
          </tbody>
        </table>
      </section><br /><br />
      <hr />
      <table className='table table-striped table-hover' id='cnt'>
        <thead>
          <tr>
            <th>Notification</th>
          </tr>
        </thead>
        <tbody>
          {viewnotif.map((nf) => (
            <tr key={nf._id}>
              <td>{nf.notification}</td>
              <td style={{ textAlign: "right" }}>
                <button id='editcbtn' className='btn' onClick={() => editNotification(nf._id)}>Edit</button>
                <button id='delcbtn' className='btn' onClick={() => deleteNotification(nf._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br/><Footer/></>
  );
};

export default Schedule;
