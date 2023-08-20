/* eslint-disable no-unused-vars */

import axios from "axios";
import {  useState } from "react";
//import Alert from 'react-bootstrap/Alert';
import './register.css';

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


function Register() {

  const [name, setName] = useState("");
  const [nic, setnic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [pass, setPassword] = useState("");
  // const [cpass, setCPassword] = useState("");

  const [errors, setErrors] = useState({});


  async function save(event) {
    event.preventDefault();

    // Validation rules
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^[0-9]*$/;

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name must contain only letters';
    }

    if (!nic.trim()) {
      errors.nic = 'NIC is required';
    }

    if (!phone.trim()) {
      errors.phone = 'Contact number is required';
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Contact number must contain only numbers';
    } else if (phone.length < 10) {
      errors.phone = 'Contact number must have 10 numeric values';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!pass.trim()) {
      errors.pass = 'Password is required';
    } else if (pass.length < 6) {
      errors.pass = 'Password must be at least 6 characters';
    }

    // if (!cpass.trim()) {
    //   errors.cpass = 'Password is required';
    // } else if (cpass.length < 6) {
    //   errors.cpass = 'Password must be at least 6 characters';
    // }

    // if (pass !== cpass) {
    //   errors.cpass("Passwords do not match.");
    // } else if (pass.length < 6) {
    //   errors.cpass("Password must be at least 6 characters");
    // }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:4000/employees/addEmployee", {
          name: name,
          nic: nic,
          email: email,
          phone: phone,
          password: pass
        });
        alert("User Registation Successfully");
        window.location.href = "./login";
      } catch (err) {
        alert(err);
      }
    }

  }

  return (
    <div className="body" style={{height: 'auto'}}>
      <div className="container">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-6 col-lg-5 col-xl-4">

                <AnimationChain className='col-md-8 col-lg-7 col-xl-6'/>
                <MovingComponent className='col-md-8 col-lg-7 col-xl-6'/>

                <br /><br /><br /><br /><br />
               
                {/* <img src=""
                  class="img-fluid" alt="Phone image" /> */}

              </div>

              <div className="card col-md-7 col-lg-5 col-xl-5 offset-xl-1" style={{paddingBottom: 'auto'}}>
                <form>

                <br />
                <div className="form-outline mb-4">
                    <h2 className="text-center">REGISTRATION</h2>
                  </div>

                  <br />

                  <table className="table form-outline mb-4">

                    <tr>
                      <td>
                        <div class="form-outline">
                          {/* <label className="label">name</label> */}
                          <input
                            type="text"
                            class="form-control bg-black text-white mb-2"
                            id="name"
                            placeholder="Enter Your Full-Name"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            />
                          {errors.name && <span className="errors">{errors.name}</span>}
                        </div>
                      </td>
                      <td>
                        <div class="form-outline">
                          {/* <label>nic</label> */}
                          <input
                            type="text"
                            class="form-control bg-black text-white mb-2"
                            id="nic"
                            placeholder="Enter Your NIC"
                            value={nic}
                            onChange={(event) => {
                              setnic(event.target.value);
                            }}
                            />
                            {errors.nic && <span className="errors">{errors.nic}</span>}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                        <div class="form-group">
                          {/* <label>email</label> */}
                          <input
                            type="email"
                            class="form-control bg-black text-white mb-2"
                            id="email"
                            placeholder="Enter Valid Email"
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            />
                           {errors.email && <span className="errors">{errors.email}</span>}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                      <div class="form-group">
                        {/* <label>Phone</label> */}
                        <input
                          type="text"
                          class="form-control bg-black text-white mb-2"
                          id="phone"
                          placeholder="Enter Contact Number"
                          value={phone}
                          onChange={(event) => {
                            setphone(event.target.value);
                          }}
                          />
                          {errors.phone && <span className="errors">{errors.phone}</span>}
                      </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <div class="form-group">
                          {/* <label>password</label> */}
                          <input
                            type="password"
                            class="form-control bg-black text-white mb-2"
                            id="pass"
                            placeholder="Enter Password"
                            value={pass}
                            onChange={(event) => {
                            setPassword(event.target.value);
                            }}
                            />
                            <p style={{color: 'white'}}>Password must contaion minimum 6 characters</p>
                            {errors.pass && <span className="errors">{errors.pass}</span>}
                        </div>
                      </td>
                    </tr>



                    <tr>
                      <td colSpan={2}>
                        <div class="form-outline mb-4">
                          <button type="submit" class="btn btn-primary btn-block" onClick={save}
                            style={{width: '550px', fontWeight: 'bold'}}>SUBMIT</button>
                        </div>
                      </td>
                    </tr>

                  </table>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  )
}

export default Register;