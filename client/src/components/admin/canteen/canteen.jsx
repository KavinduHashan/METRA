import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './canteen.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

const Canteen = () => {
  const [canteenData, setCanteenData] = useState([]);
  const [foodname, setFoodname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getCanteenData();
  }, []);

  const getCanteenData = async () => {
    const result = await axios.get('http://localhost:4000/canteens/getcanteen');
    setCanteenData(result.data);
  };

  const addCanteenData = async () => {
    await axios.post('http://localhost:4000/canteens/addcanteen', {
      foodname:foodname,
      quantity:quantity,
      price:price
    });
    getCanteenData();
  };

  const editCanteenData = async (id) => {
    const result = await axios.get(`http://localhost:4000/canteens/editcanteen/${id}`);
    setId(result.data._id);
    setFoodname(result.data.foodname);
    setQuantity(result.data.quantity);
    setPrice(result.data.price);
    getCanteenData();
  };

  const updateCanteenData = async () => {
    await axios.post(`http://localhost:4000/canteens/updatecanteen/${id}`, {
      foodname,
      quantity,
      price
    });
    getCanteenData();
    setFoodname('');
    setQuantity('');
    setPrice('');
    setId('');
    getCanteenData();
  };

  const deleteCanteenData = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
    await axios.get(`http://localhost:4000/canteens/deletecanteen/${id}`);
    getCanteenData();
      }
  };

  return (
    <><NavbarAdmin />
    <div className='container'><br />
      <h2>Canteen View</h2><br /><br />
      <form>
        {/* <label>Food Name:</label>
    <input type="text" value={foodname} onChange={(e) => setFoodname(e.target.value)} /><br /><br />
    <label>Quantity:</label>
    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br /><br />
    <label>Price:</label>
    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />
    {id ? <button onClick={updateCanteenData}>Update</button> : <button onClick={addCanteenData}>Add</button>} */}
        <section className='cantten'>
          <table className='table table-borderless'>
            <tbody style={{ width: "100px" }}>
              <tr>
                <td><label>Food Name</label></td>
                <td><input type="text" value={foodname} placeholder='ex: Burger' className='form-control' onChange={(e) => setFoodname(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Quantity</label></td>
                <td><input type="text" value={quantity} placeholder='ex: 10' className='form-control' onChange={(e) => setQuantity(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label>Price</label></td>
                <td><input type="text" value={price} placeholder='ex: LKR150' className='form-control' onChange={(e) => setPrice(e.target.value)} /></td>
              </tr>
              <tr>
                <td></td>
                <td>{id ? <button className='form-control' id='cupbtn' onClick={updateCanteenData}>Update</button> : <button className='form-control' id='caddbtn' onClick={addCanteenData}>Add</button>}</td>
              </tr>
            </tbody>
          </table>
        </section><br /><br />
      </form>

      <table className='table table-striped table-hover' id='cnt'>
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Quantity</th>
            <th>Price (LKR)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {canteenData.map((canteen) => (
            <tr key={canteen._id}>
              <td>{canteen.foodname}</td>
              <td>{canteen.quantity}</td>
              <td>{canteen.price}</td>
              <td style={{ textAlign: "right" }}>
                <button id='editcbtn' className='btn' onClick={() => editCanteenData(canteen._id)}>Edit</button>
                <button id='delcbtn' className='btn' onClick={() => deleteCanteenData(canteen._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br/><Footer/></>
  );
};

export default Canteen;
