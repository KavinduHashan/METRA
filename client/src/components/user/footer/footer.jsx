/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import axios from "axios";
import {  useState } from "react";

import './footer.css'

const Footer = () => {
    const year = new Date().getFullYear();

  const [feedback, setFeedback] = useState("");

  const [errors, setErrors] = useState({});


  async function save(event) {
    event.preventDefault();
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!feedback.trim()) {
      errors.feedback = 'Feedback is required';
    } else if (!nameRegex.test(feedback)) {
      errors.feedback = 'Feedback must contain only letters';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:4000/feedbacks/addfeedback", {
            feedback: feedback,
        });
        alert("Thanks for your Feedback..!");
        window.location.href = "/home";
      } catch (err) {
        alert(err);
      }
    }
      
    }
  
    return (

        <>
           <footer>
            <section className="f-main">
                <div className="footer1">
                    <h4>SERVICES</h4><br/>
                    <a href="/home">HOME</a><br/>
                    <a href="schedule/">SCHEDULE</a><br/>
                    <a href="/foodordermain">FOOD ORDER</a><br/>
                    <a href="/location">LOCATION</a><br/>
                    <a href="/complaint">COMPLANIT</a><br/>
                
                </div>
                <div className="footer2">
                <h4>CONTACT US</h4><br/>
                <a href="http://www.railway.gov.lk/web/">Sri Lanka Railways and Work Department,</a><br/>
                <a href="http://www.railway.gov.lk/web/">Colombo,</a><br/>
                <a href="http://www.railway.gov.lk/web/">Sri Lanka,<br/>Tel: +94-11-2421281</a><br/>

                </div>
                <div className="footer3">
                <h4>FEEDBACK</h4><br/><br/>
                <form>
                    {/* <input type="text" className="input bg-dark text-white" placeholder="Enter Feedback Here..!" /><br/> */}
                    <input 
                                      type="text"  
                                      class="form-control" 
                                      id="feedback" 
                                      placeholder="Enter yout feedback here " 
                                      value={feedback}
                                      onChange={(event) => {
                                        setFeedback(event.target.value);
                                      }}                  
                                      />
                                      {errors.feedback && <span className="error">{errors.feedback}</span>}<br/>
                    <button type="submit" className="button" onClick={save}>SUBMIT</button>
                </form>
                </div>
            </section>
        <div id="f">{`Copyright © METRA ${year}`}</div></footer>
    </>
    )
  };
  
  export default Footer;