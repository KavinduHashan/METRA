import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './complaint.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

function ComplaintList() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/complaints/count');
        setCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);


  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchComplaints() {
      const response = await axios.get('http://localhost:4000/complaints/getComplaint');
      setComplaints(response.data);
    }

    fetchComplaints();
  }, []);

  async function handleDeleteComplaint(id) {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
      await axios.get(`http://localhost:4000/complaints/deleteComplaint/${id}`);
      setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <><NavbarAdmin /><div className='container'><br />
      <h2>Complaint List</h2><br /><br />
      <div>
      <p>Number of Complaints : <b>{count}</b></p>
    </div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>email</th>
            <th>Complaint</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint._id}>
              <td>{complaint.email}</td>
              <td>{complaint.complaint}</td>
              <td style={{ textAlign: "right" }}>
                <button className='btn' id='delclinibtn' onClick={() => handleDeleteComplaint(complaint._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br/><Footer/></>
  );
}

export default ComplaintList;
