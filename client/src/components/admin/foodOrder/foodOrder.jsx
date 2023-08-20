import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './foodOrder.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

function FoodList() {
  //credit card
  const [food, setFood] = useState([]);

  useEffect(() => {
    async function fetchComplaints() {
      const response = await axios.get('http://localhost:4000/foodorders/getfoodCredit');
      setFood(response.data);
    }

    fetchComplaints();
  }, []);

  async function handleDeleteComplaint(id) {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
      await axios.get(`http://localhost:4000/foodorders/deletefoodCredit/${id}`);
      setFood(prevFood => prevFood.filter(food => food._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }


  //cash
  const [foodc, setFoodc] = useState([]);

  useEffect(() => {
    async function CfetchComplaints() {
      const response = await axios.get('http://localhost:4000/foodorders/getfoodCash');
      setFoodc(response.data);
    }

    CfetchComplaints();
  }, []);

  async function ChandleDeleteComplaint(id) {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
      await axios.get(`http://localhost:4000/foodorders/deletefoodCash/${id}`);
      setFoodc(prevFood => prevFood.filter(food => food._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <><NavbarAdmin /><div className='container'><br />
      <h2>Food Ordered List - Credit Card Payment</h2><br /><br />
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Seat No</th>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {food.map(f => (
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.seatnum}</td>
              <td>{f.foodname}</td>
              <td>{f.quantity}</td>
              <td>{f.price}</td>
              <td style={{ textAlign: "right" }}>
                <button className='btn' id='delclinibtn' onClick={() => handleDeleteComplaint(f._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br/><br/>

      <h2>Food Ordered List - Cash on Deliver</h2><br /><br />
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Seat No</th>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Bill</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foodc.map(f => (
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.seatnum}</td>
              <td>{f.foodname}</td>
              <td>{f.quantity}</td>
              <td>LKR{f.pay}</td>
              <td>{f.price}</td>
              <td style={{ textAlign: "right" }}>
                <button className='btn' id='delclinibtn' onClick={() => ChandleDeleteComplaint(f._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br/>
    <Footer/></>
  );
}

export default FoodList;
