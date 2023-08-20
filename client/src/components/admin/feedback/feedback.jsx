import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './feedback.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

const FeedbackList = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/feedbacks/count');
        setCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/feedbacks/getFeedback')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = id => {
    const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
    if (confirmed) {
    axios.get(`http://localhost:4000/feedbacks/deleteFeedback/${id}`)
      .then(res => {
        const newFeedbacks = feedbacks.filter(fb => fb._id !== id);
        setFeedbacks(newFeedbacks);
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <><NavbarAdmin /><div className='container'><br />
    
      <h2>Feedback List</h2><br /><br />
      <div>
      <p>Number of Feedbacks : <b>{count}</b></p>
    </div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Feedback</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(fb => (
            <tr key={fb._id}>
              <td>{fb.feedback}</td>
              <td style={{ textAlign: "right" }}>
                <button id='delclinibtn' className='btn' onClick={() => handleDelete(fb._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><r/><Footer/></>
  );
};

export default FeedbackList;
