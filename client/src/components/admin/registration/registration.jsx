import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavbarAdmin from '../navbarAdmin/navbar';
import Footer from '../footerAdmin/footerAdmin';

function Employee() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/employees/count');
        setCount(response.data.count);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);


  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/employees/getemp');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this schedule?');
  
      if (confirmed) {
      const response = await axios.get(`http://localhost:4000/employees/deleteEmployee/${id}`);
      alert(response.data.message);
      getEmployees();
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting employee');
    }
  };

  return (
    <><NavbarAdmin /><div className='container'>
      <h2>Registration List</h2>
      <div>
      <p>Number of registrations : <b>{count}</b></p>
    </div>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.nic}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td style={{ textAlign: "right" }}>
              <button id='delclinibtn' className='btn' onClick={() => deleteEmployee(employee._id)}>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
    <br/>
    <Footer/></>
  );
}

export default Employee;
