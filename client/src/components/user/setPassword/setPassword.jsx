/* eslint-disable react-hooks/rules-of-hooks */

/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from 'react';
//import Alert from 'react-bootstrap/Alert';
import '../login/login.css';

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


function setPassword() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errors, setErrorss] = useState({});

  const handleSubmit = async (event) => {
    const err = {};

    if (!email.trim()) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      err.email = 'Email is invalid';
    }

    if (!password.trim()) {
      err.password = 'Password is required';
    } else if (password.length < 6) {
      err.password = 'Password must be at least 6 characters';
    }

    if (!cpassword.trim()) {
      err.cpassword = 'Confirm Password is required';
    } else if (cpassword.length < 6) {
      err.cpassword = 'Confirm Password must be at least 6 characters';
    } else if (password !== cpassword) {
      err.cpassword = 'Password and Confirm Password do not match';
      err.password = 'Password and Confirm Password do not match';
    }

    
    setErrorss(err);

    event.preventDefault();

      if(Object.keys(err).length ===0 ){
        
          event.preventDefault();
          try {
            const response = await axios.post('http://localhost:4000/employees/setNewPassword', {
              email,
              password,
            });
            alert(response.data.message);
            window.location.href = '/login';
          } catch (error) {
              alert(error.response.data.message);
          }
    }
    
  }

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
                <form onSubmit={handleSubmit}>
                <br /><br />
                <div class="form-outline mb-4">
                    <h2 htmlFor="login"> CREATE A NEW PASSWORD </h2>
                </div>
                <br /><br />                

                  <div class="form-outline mb-4" id="in">
                    {/* <label>email</label> */}
                    <input 
                      type="email"  
                      class="form-control bg-black text-white" 
                      id="email" 
                      placeholder="Email" 
                      onChange={(e) => setEmail(e.target.value)}
                      /> 
                      {errors.email && <span className="error">{errors.email}</span>}                
                  </div> 

                  <div class="form-group">
                          {/* <label>password</label> */}
                          <input
                            type="password"
                            class="form-control bg-black text-white mb-2"
                            id="password"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(event) => {
                            setPassword(event.target.value);
                            }}
                            />
                            {errors.password && <span className="errors">{errors.password}</span>}
                            <p style={{color: 'white'}}>Password must contaion minimum 6 characters</p>
                        </div> 

                  <div class="form-group">
                          {/* <label>password</label> */}
                          <input
                            type="password"
                            class="form-control bg-black text-white mb-2"
                            id="cpassword"
                            placeholder="Enter Confirm Password"
                            value={cpassword}
                            onChange={(event) => {
                              setCPassword(event.target.value);
                              }}
                            />
                            {errors.cpassword && <span className="errors">{errors.cpassword}</span>}
                        </div><br />

                  <div class="form-outline mb-4">
                    <button type="submit" class="btn btn-primary">SET NEW PASSWORD</button>
                    {/* <button type="submit" class="btn btn-primary" onClick={handleLoginButtonClick}>SIGN IN</button> */}
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

export default setPassword;