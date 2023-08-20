import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './schedule.css';
import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

const Schedule = () => {
  const [id, setId] = useState('');
  const [trainname, setTrainname] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    const result = await axios.get('http://localhost:4000/schedules/getschedule');
    setSchedules(result.data);
  };

  const addSchedule = async () => {
    await axios.post('http://localhost:4000/schedules/addSchedule', {
      trainname: trainname,
      start: start,
      end: end,
      date: date,
      time: time,
      price: price
    });
    getSchedule();
  };

  const editSchedule= async (id) => {
    const result = await axios.get(`http://localhost:4000/schedules/editSchedule/${id}`);
    setId(result.data._id);
    setTrainname(result.data.trainname);
    setStart(result.data.start);
    setEnd(result.data.end);
    setTime(result.data.time);
    setDate(result.data.date);
    setPrice(result.data.price);
    getSchedule();
  };

  const updateSchedule = async () => {
    await axios.post(`http://localhost:4000/schedules/updateSchedule/${id}`, {
        trainname,
        start,
        end,
        date, 
        time,
        price
    });
    getSchedule('');
    setTrainname('');
    setStart('');
    setEnd('');
    setDate('');
    setTime('');
    setPrice('');
    getSchedule();
  };

  const deleteSchedule = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
    await axios.get(`http://localhost:4000/schedules/deleteSchedule/${id}`);
    getSchedule();
      }
  };

  function getMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <><NavbarAdmin /><div className='container'><br />
      <h2>Schedule Management</h2><br /><br />

      {/* <label>Train Name:</label>
    <input type="text" value={trainname} onChange={(e) => setTrainname(e.target.value)} /><br /><br />

    <label>Arriving Location:</label>
    <input type="text" value={start} onChange={(e) => setStart(e.target.value)} /><br /><br />

    <label>Departure Location:</label>
    <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} /><br /><br />

    <label>Date:</label>
    <input type="date"
     value={end}
     min={getMinDate()}
     onChange={(e) =>
     setDate(e.target.value)}
     />
     <br /><br />
    {id ? <button onClick={updateSchedule}>Update</button> : <button onClick={addSchedule}>Add</button>} */}

      <section className='cantten'>
        <table className='table table-borderless'>
          <tbody style={{ width: "100px" }}>
            <tr>
              <td><label>Train Name:</label></td>
              <td><input type="text" className='form-control' placeholder='ex: e-Samudra'  value={trainname} onChange={(e) => setTrainname(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Arriving Location:</label></td>
              <td><input type="text" className='form-control' placeholder='ex: Kaluthara' value={start} onChange={(e) => setStart(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Departure Location</label></td>
              <td><input type="text" className='form-control' placeholder='ex: Colombo' value={end} onChange={(e) => setEnd(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Departure Location</label></td>
              <td><input type="text" className='form-control' placeholder='ex: 8.00AM' value={time} onChange={(e) => setTime(e.target.value)} /></td>
            </tr>
            <tr>
              <td><label>Departure Location</label></td>
              <td><input type="text" className='form-control' placeholder='ex: LKR500' value={price} onChange={(e) => setPrice(e.target.value)} /></td>
            </tr>
            <tr>
              <td>Date</td>
              <td><input type="date"
                value={date}
                id='date'
                className='form-control'
                min={getMinDate()}
                onChange={(e) => setDate(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>{id ? <button className='form-control' id='cupbtn' onClick={updateSchedule}>Update</button> : <button className='form-control' id='caddbtn' onClick={addSchedule}>Add</button>}</td>
            </tr>
          </tbody>
        </table>
      </section><br /><br />
      <hr />
      <table className='table table-striped table-hover' id='cnt'>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Time</th>
            <th>Arriving Location</th>
            <th>Departure Location</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((sch) => (
            <tr key={sch._id}>
              <td>{sch.trainname}</td>
              <td>{sch.time}</td>
              <td>{sch.start}</td>
              <td>{sch.end}</td>
              <td>{sch.date}</td>
              <td>{sch.price}</td>
              <td style={{ textAlign: "right" }}>
                <button id='editcbtn' className='btn' onClick={() => editSchedule(sch._id)}>Edit</button>
                <button id='delcbtn' className='btn' onClick={() => deleteSchedule(sch._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div><br/><Footer/></>
  );
};

export default Schedule;
