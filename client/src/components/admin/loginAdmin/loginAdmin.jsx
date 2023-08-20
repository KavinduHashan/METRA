/* eslint-disable no-unused-vars */
import axios from "axios";
import {  useState } from "react";
import React from "react";
//import Alert from 'react-bootstrap/Alert';
import './loginAdmin.css';

import MovingText from 'react-moving-text';
import MovingComponent from 'react-moving-text';

const AnimationsForChaining = ["swing", "flipSlowDown", "fadeOutToBottom", "jelly"];

const AnimationChain = () => {
  const [animationIndex, setAnimationIndex] = useState(0)

const handleChainAnimation = () => {
  if (animationIndex < AnimationsForChaining.length - 1) {
    setAnimationIndex(animationIndex + 1)
  }
}

return (
  <><MovingText
    t type="glowing"
    duration="1000ms"
    delay="0s"
    direction="alternate"
    timing="ease"
    iteration="infinite"
    fillMode="none"
    >      
    <p style={{ fontSize: "100px", fontFamily: 'Arial Black', textAlign: 'right', fontWeight: 'bold' }}>
      METRA<br />
    </p>

    </MovingText>

    <MovingComponent
      type="shakeMix"
      duration="2000ms"
      delay="0s"
      direction="alternate"
      timing="ease"
      iteration="infinite"
      fillMode="none"
      >
      <h2 style={{fontFamily:'Consolas', textAlign:'right', color:'white'}}>Railway Management System</h2>
    </MovingComponent>

    </>
  )
}


function Login() {

  const [email, setEmailAddress] = useState("");
  const [pass, setPasswordd] = useState("");
  const [errors, setErrorss] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState('');

  // create a function to handle login button click
  const handleLoginButtonClick = async (event) => {

    const err = {};

    if (!email.trim()) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'Email is invalid';
    }

    if (!pass.trim()) {
      err.pass = 'Password is required';
    } else if (pass.length < 5) {
      err.pass = 'Password must be at least 5 characters';
    }

    setErrorss(err);

    event.preventDefault();

    if (pass === "metra") {
    // if password is correct, navigate to home page
    window.location.href = "./homeAdmin";
    } else {
    // if password is incorrect, display error message
    alert("Invalid password");
    }
  };


 

  return (

    <div className="body" style={{height: 'auto'}}>
      <div className="container">
        <section class="vh-100">
          <div class="container py-5 h-100">
            <div class="row d-flex align-items-center justify-content-center h-100">
              <div class="col-md-8 col-lg-7 col-xl-6">

                <AnimationChain className='col-md-8 col-lg-7 col-xl-6'/>
                <MovingComponent className='col-md-8 col-lg-7 col-xl-6'/>
                <br /><br /><br /><br /><br />
                {/* <img src=""
                  class="img-fluid" alt="Phone image" /> */}

              </div>
              
              <div class="cardd col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form >
                <br /><br /><br />
                <div class="form-outline mb-4">
                    <h2 htmlFor="login"> LOGIN - ADMIN </h2>
                </div>
                  
                <br /><br />                

                  <div class="form-outline mb-4" id="in">
                    {/* <label>email</label> */}
                    <input 
                      type="text"  
                      class="form-control bg-black text-white" 
                      id="email" 
                      placeholder="" 
                      value={"metrarailway@gmail.com"}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      /> 
                      {/* {errors.email && <span className="error">{errors.email}</span>}                 */}
                  </div>

                  <div class="form-outline mb-4" id="in">
                    {/* <label>password</label> */}
                    <input 
                      type="password"  
                      class="form-control bg-black text-white" 
                      id="pass" 
                      placeholder="Password" 
                      value={pass}
                      onChange={(e) => setPasswordd(e.target.value)}        
                                                                 
                      />
                      {errors.pass && <span className="error">{errors.pass}</span>}
                  </div>        

                  <div class="form-outline mb-4">
                    <button type="submit" class="btn btn-primary" onClick={handleLoginButtonClick}>SIGN IN</button>
                  </div>

                                             
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  
  )

}

export default Login;