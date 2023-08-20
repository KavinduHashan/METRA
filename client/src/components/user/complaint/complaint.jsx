import React, { useState } from 'react';
import axios from 'axios';

import './compliant.css';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

function Complaint() {
  const [email, setEmail] = useState('');
  const [complaint, setComplaint] = useState('');

  const [errors, setErrors] = useState({});


//   async function handleSubmit(event) {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/complaints/addcomplaint', { email, complaint });
//       alert("Complaint Submitted");
//       window.location.href = "./complaint";

//       setMessage(response.data.employee);
//     } catch (error) {
//       console.log(error);
//       alert("Err");
//       setMessage('Something went wrong');
//     }
//   }


  async function handleSubmit(event) {
    event.preventDefault();

    // Validation rules
    const errors = {};

    if (!complaint.trim()) {
      errors.complaint = 'Complaint is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:4000/complaints/addcomplaint", {
          email: email,
          complaint: complaint
        });
        alert("Complaint Submitted");
        window.location.href = "./complaint";
      } catch (err) {
        alert(err);
      }
    }

  }

  return (
    <div >
        <Navbar/>
        <div className='mapBody'> <br /><br /> <br />
      <h2>Complaint Section</h2><br /> <br /><br />
      </div>
      
        <div className="container" id='terms'><br /><br />
        <h2 style={{textAlign:"left"}}>Terms and Conditions</h2><br />
          <p>1. Booking Confirmation: All bookings are subject to availability and confirmation from the respective railway authorities.</p>
          <p>2. Payment: Payment for tickets must be made in full at the time of booking. Accepted payment methods and any applicable fees or charges should be clearly specified.</p>
          <p>3. Ticket Validity: Tickets are valid only for the specified train, date, and class of travel. Any modifications or changes to the ticket may be subject to additional charges.</p>
          <p>4. Passenger Information: Accurate and complete passenger information must be provided at the time of booking. Any errors or inaccuracies should be reported and corrected promptly.</p>
          <p>5. Ticket Delivery: The method of ticket delivery, such as e-ticket or physical ticket, should be specified. Any delivery charges or requirements for ticket collection should also be clearly outlined.</p>
          <p>6. Responsibility and Liability: The terms and conditions should clarify the responsibilities and liabilities of the service provider and the customer regarding ticket issuance, travel arrangements, delays, cancellations, or any other unforeseen circumstances.</p>
          <p>7. Personal Data Protection: The system should outline its privacy policy and how customer data will be collected, stored, and protected in accordance with applicable data protection laws.</p>
          <p>8. Compliance with Laws and Regulations: The terms and conditions should state that both the service provider and the customer must comply with applicable laws, regulations, and terms of use.</p>
          <br /><br />
      <section className='comSec'>
        <h5>If You Have Any Issue With That System Please Fill This Form</h5><br/>
      <table className="table form-outline mb-4">
            <tr>
            <td>
                <div className="form-group">
                    <input type="email" 
                    className="form-control"
                    id="email"
                    value={email} 
                    placeholder='Email' 
                    onChange={(event) => 
                    setEmail(event.target.value)} 
                    />
                    {errors.email && <span className="errors">{errors.email}</span>}
                </div>
            </td>
        </tr>

        <tr>
            <td>
                <div className="form-group">
                    <textarea id="complaint" 
                    className="form-control"
                    placeholder='Type Your Complaint'
                    value={complaint} 
                    onChange={(event) => 
                    setComplaint(event.target.value)}></textarea>
                    {errors.complaint && <span className="errors">{errors.complaint}</span>}

                </div>
            </td>
        </tr>
        <tr>
            <td>
            <div className="form-group">
                <button
                    type="submit" 
                    onClick={handleSubmit}
                    id='cbtn'
                    className="form-control"
                    >Submit
            </button>
            </div>
            </td>
        </tr>
      </table>
      </section>
      </div><br/><br/><br/>
      
      <Footer/>
    </div>
  );
}

export default Complaint;
