/* eslint-disable jsx-a11y/no-distracting-elements */
//import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './booking.css';

import Footer from '../footer/footer'
import Navbar from '../navbar/navbar';

const MySwal = withReactContent(Swal);

function Booking() {

  const [notif, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get('http://localhost:4000/notifications/getNotification');
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotifications();
  }, []);

  // algorithm
  const [availableSeatsByLocation, setAvailableSeatsByLocation] = useState({});

  useEffect(() => {
    async function fetchBookingLocations() {
      try {
        const response = await axios.get('http://localhost:4000/bookings/countLocationsAlgorithm');
        setAvailableSeatsByLocation(response.data.availableSeatsByLocation);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBookingLocations();
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [pay, setPay] = useState("");


  const [trainname, setTrain] = useState("");
  const trainoption = ["Samudra Devi","Udarata Manike","Ruhunu Kumari", "Uttara Devi", "Rajarata Manike", "Yal Devi"];
  const selectTrain = (event) => {
    setTrain(event.target.value);
  };

  const [time, setTime] = useState("");
  const timeoption = ["7.00AM","5.00PM"];
  const selecttime = (event) => {
    setTime(event.target.value);
  };

  // booking start
  const [start, setStart] = useState("");
  const BookingStartoptions = ["Colombo","Galle","Kurunagala", "Kaluthara", "Jaffna", "Kandy", "Hatton"];
  const handlebokkingSelectChange = (event) => {
    setStart(event.target.value);
  };

    // booking end
    const [end, setEnd] = useState("");
    const BookingEndoptions = ["Hatton","Kandy","Jaffna", "Kaluthara", "Kurunagala", "Galle", "Colombo"];
    const handlebokkingEndSelectChange = (event) => {
      setEnd(event.target.value);
    };




  // search start
  const [selectedStartValue, setSelectedStartValue] = useState("");
  const options = ["Colombo","Galle","Kurunagala", "Kaluthara", "Jaffna", "Kandy", "Hatton"];
  const handleSelectChange = (event) => {
    setSelectedStartValue(event.target.value);
  };


  // serach end
  const [selectedEndValue, setSelectedEndValue] = useState("");
  const endoptions = ["Hatton","Kandy","Jaffna", "Kaluthara", "Kurunagala", "Galle", "Colombo"];
  const handleEndSelectChange = (event) => {
    setSelectedEndValue(event.target.value);
  };



  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([]);

  // function to get the minimum date for booking (today)
  function getMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  }



  const publishableKey = 'pk_test_51MQO2UExfkudzaoVZWjthqO1IN1xFq3zntuRI2I5jfg5CN02rj9YfWhoz8ozk5SzqqY6jsETfmu3vrFKS2z2nhYb004jBem0D1';
  // const [product, setProduct] = useState({
  const [product] = useState({
    // name: 'Headphone',
    price: 500,
  });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 10000,

    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,


    });
    // const handleFailure = () => {
    //   MySwal.fire({
    //     icon: 'error',
    //     title: 'Payment was not successful',
    //     time: 4000,
    //   });
  };

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

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      errors.phone = 'Contact number is required';
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Contact number must contain only numbers';
    } else if (phone.length < 10) {
      errors.phone = 'Contact number must have 10 numeric values';
    }

    if (!start.trim()) {
      errors.start = 'Arriving Location is required';
    } else if (!nameRegex.test(start)) {
      errors.start = 'Must contain only letters';
    }

    if (!end.trim()) {
      errors.end = 'Depature Location is required';
    } else if (!nameRegex.test(end)) {
      errors.end = 'Must contain only letters';
    }

    if (!date.trim()) {
      errors.date = 'End is required';
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post("http://localhost:4000/bookings/addbooking", {
          email: email,
          name: name,
          phone: phone,
          start: start,
          end: end,
          date: date,
          Pay: pay,
          trainname: trainname,
          time: time
        });
        //alert("Successfully");
        //payNow();

      } catch (err) {
        alert("Sorry.., Tickets are sold out");
      }
  }
  
}

  const payNow = async token => {
    if (Object.keys(errors).length === 0) {
    try {
      const response = await axios({
        url: 'http://localhost:4000/payments/payment-handle',
        method: 'post',
        data: {
          amount: product.price * 100,
          token,
        },
      });

      if (response.status === 200) {
        handleSuccess();
        window.location.href = "./home";
      }

    } catch (error) {
      handleFailure();
      console.log(error);
      window.location.href = "./home";

    }
  }
  };

  // const payNow = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:4000/payments/payment-handle", {
  //       amount: product.price * 100,
  //     });
  //     if (response.status === 200) {
  //       handleSuccess();
  //     }
  //   } catch (error) {
  //     handleFailure();
  //     console.log(error);
  //   }
  // };

  // for search date
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {

        if (selectedStartValue === undefined || selectedStartValue === null || selectedStartValue === "") { 
          alert("Arriving Location is required.");
          return;
        } else if (selectedEndValue === undefined || selectedEndValue === null || selectedEndValue === "") {
          alert("Departure Location is required.");
          return;
        } 

        const response = await axios.post(`http://localhost:4000/schedules/getSearch`, {
          //  searchdate,
          // start: searchStart,
          //  end :searchEnd
          start: selectedStartValue,
          end : selectedEndValue
        });

        if (response.data.length === 0) {
          // check if no data is found
          alert("There is no any train");
          handleClear();

        } else {
          setUsers(response.data);
        }

        // setUsers(response.data);
      } catch (err) {
        alert(err);
      }
    }

  }

  const handleClear = async (event) => {
    // setSearchStart(event.target.value);
    setSelectedStartValue('');
    setSelectedEndValue('');
    setUsers([]);

  }

  const handleClearBooking = async (event) => {
    setName('');
    setEmail('');
    setPhone('');
    setStart('');
    setEnd('');
    setDate('');
    setUsers([]);
    window.location.href = "./home";

  }

  return (
    <div className="bookingbody">
      <Navbar/>
        <div className='mapBody'>
          <div className='container'><br/><br/>
        <h1 style={{textAlign:"left"}}>Book A Seat</h1>
        </div>

        <div className='container' style={{marginLeft:"50px"}}><br/>
          <h2>Seat Availability OF Trains</h2><br/>
          {/* <ul>
            {Object.entries(locations).map(([location, availableSeats]) => (
              <li key={location}>
                {location}: {availableSeats}
              </li>
            ))}
          </ul> */}
          <table className='text-left' id='scheduletbl'>
          <thead>
              <tr>
                <th></th>
                <th>Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(availableSeatsByLocation).map((location) => (
                <tr key={location}>
                  <th>{location}</th>
                  <th  style={{textAlign:"center"}}><h1>{availableSeatsByLocation[location]}</h1></th>
                </tr>
              ))}
            </tbody>
          </table
        ></div><br/><br/>
    </div>

    <div id='not'>
          <ul>
            {notif.map(n => (
              <li key={n._id}>
                <marquee>
                  <p>Argent Notifications: {n.notification}</p>
                </marquee>
              </li>
            ))}
          </ul>
        </div>


    <div className="container">

        <section className="booking-features">
          <div className='booking-feature1'>
          <form>
            <table className='table'>
              <h4>SEARCH TRAIN</h4>
              <tr>

                <td style={{width:"190px"}}>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="selectedStartValue"
                      value={selectedStartValue}
                      onChange={handleSelectChange}
                    >
                      <option value="" disabled>Arriving Location</option>
                      {options.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td style={{width:"200px"}}>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="selectedEndValue"
                      value={selectedEndValue}
                      onChange={handleEndSelectChange}
                    >
                      <option value="" disabled>Departure Location</option>
                      {endoptions.map((endoptions) => (
                        <option value={endoptions} key={endoptions}>
                          {endoptions}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>


              </tr>

              <tr>
                {/* <td>
                  <div class="form-group">
                      <input
                          type="date"
                          class="form-control-searchDate"
                          // class="form-control-searchDate"
                          id="searchdate"
                          placeholder="Date"
                          value={searchdate}
                          min={getMinDate()}
                          max={getMaxDate()}
                          onChange={(event) => {
                          setSearchDate(event.target.value);
                          }}
                        />
                    </div>
                  </td> */}
                  <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;


                    <button id='searchbtn' onClick={handleSubmit}>SEARCH</button>


                  </td>
                  <td>
                  <button id="clearbtn"  onClick={handleClear}>CLEAR</button>
                  </td>
              </tr>
            </table>
          </form>


          <div className='s-box mt-3'>
            <div className='s'>
              <ul>
                {users.map((user) =>
                  <li key={user.id} style={{padding:'10px'}}><hr/>
                    <h4 style={{color:'black'}}>Avaliable Trains :</h4><br/>

                    Train Name: <b>{user.trainname}</b> <br/>
                    Arriving Location : <b>{user.start}</b> <br />
                    Departure Location: <b>{user.end}</b><br />
                    Date: <b>{user.date}</b><br />
                    Time: <b>{user.time}</b><br /><br/>
                    Tickect Price: <b>LKR{user.price}</b><br /><br/>
                    {/* Avaliable Seats: 50/ <b>{count}</b><hr /> */}
                  </li>
                )}
              </ul>
            </div>
          </div>

          </div>

            <div className="booking-feature2">
              <h2>SEAT BOOKING SECTION</h2><br/>
              <table className='table'>
                <tr>
                  <td colSpan={2}>
                    <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          placeholder="Enter Full-Name"
                          value={name}
                          onChange={(event) => {
                          setName(event.target.value);
                          }}
                          />
                          {errors.name && <span className="errors">{errors.name}</span>}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div class="form-group">
                    <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Enter Email"
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
                        <input
                          type="number"
                          class="form-control"
                          id="phone"
                          placeholder="Contact Number"
                          value={phone}
                          onChange={(event) => {
                          setPhone(event.target.value);
                          }}
                          />
                          {errors.phone && <span className="errors">{errors.phone}</span>}
                    </div>
                  </td>
                </tr>

                <tr>
                  {/* <td>
                    <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="trainname"
                          placeholder="Train Name"
                          value={trainname}
                          onChange={(event) => {
                          setTrain(event.target.value);
                          }}
                          />
                          {errors.trainname && <span className="errors">{errors.trainname}</span>}
                      </div>
                    </td> */}
                    <td>
                    <div className="form-group">
                      <select
                        className="form-control"
                        id="trainname"
                        value={trainname}
                        onChange={selectTrain}
                      >
                        <option value="" disabled>Train Name</option>
                        {trainoption.map((trainoption) => (
                          <option value={trainoption} key={trainoption}>
                            {trainoption}
                          </option>
                        ))}
                      </select>
                      {errors.trainname && <span className="errors">{errors.trainname}</span>}
                    </div>
                    </td>
                    <td>
                    <div className="form-group">
                      <select
                        className="form-control"
                        id="time"
                        value={time}
                        onChange={selecttime}
                      >
                        <option value="" disabled>Train Time</option>
                        {timeoption.map((timeoption) => (
                          <option value={timeoption} key={timeoption}>
                            {timeoption}
                          </option>
                        ))}
                      </select>
                      {errors.time && <span className="errors">{errors.time}</span>}
                    </div>
                    </td>
                </tr>

                <tr>
                  {/* <td>
                    <div class="form-group">
                        <input
                          type="text"
                          class="form-control"
                          id="start"
                          placeholder="Arriving Location"
                          value={start}
                          onChange={(event) => {
                          setStart(event.target.value);
                          }}
                          />
                          {errors.start && <span className="errors">{errors.start}</span>}
                      </div>
                    </td>
                  <td> */}
                  <td>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="start"
                      value={start}
                      onChange={handlebokkingSelectChange}
                    >
                      <option value="" disabled>Arriving Location</option>
                      {BookingStartoptions.map((BookingStartoptions) => (
                        <option value={BookingStartoptions} key={BookingStartoptions}>
                          {BookingStartoptions}
                        </option>
                      ))}
                    </select>
                    {errors.start && <span className="errors">{errors.start}</span>}
                  </div>
                </td>
                {/* <td>
                  <div class="form-group">
                      <input
                          type="text"
                          class="form-control bg-white"
                          id="end"
                          placeholder="Departure Location"
                          value={end}
                          onChange={(event) => {
                          setEnd(event.target.value);
                          }}
                          />
                          {errors.end && <span className="errors">{errors.end}</span>}
                      </div>
                  </td> */}
                  <td>
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="end"
                      value={end}
                      onChange={handlebokkingEndSelectChange}
                    >
                      <option value="" disabled>Departure Location</option>
                      {BookingEndoptions.map((BookingEndoptions) => (
                        <option value={BookingEndoptions} key={BookingEndoptions}>
                          {BookingEndoptions}
                        </option>
                      ))}
                    </select>
                    {errors.end && <span className="errors">{errors.end}</span>}
                  </div>
                </td>
                </tr>
                <tr>
                  <td>
                    <div class="form-group">
                        <input
                          type="date"
                          class="form-control"
                          id="date"
                          placeholder="Date"
                          value={date}
                          min={getMinDate()}
                          onChange={(event) => {
                          setDate(event.target.value);
                          }}
                          />
                          {errors.date && <span className="errors">{errors.date}</span>}
                      </div>
                    </td>
                  <td>
                    <div class="form-group">
                      <input
                          type="number"
                          class="form-control bg-white"
                          id="pay"
                          placeholder="Price of Ticket"
                          value={pay}
                          onChange={(event) => {
                          setPay(event.target.value);
                          }}
                          />
                          {errors.pay && <span className="errors">{errors.pay}</span>}
                      </div>
                    {/* <br />
                    <h4 style={{textAlign: 'center', color:'black'}}>
                      <span>Price: </span>LKR{product.price}
                    </h4> */}
                  </td>
                </tr><br/>
                <tr>
                  <td>
                    <StripeCheckout
                      stripeKey={publishableKey}
                      label="Pay Now"
                      name="Pay With Credit Card"
                      // billingAddress
                      // shippingAddress
                      currency='LKR'
                      amount={priceForStripe}
                      // description={`Your total is LKR${product.price}`}
                      description={`Your total is LKR${pay}`}
                      token={payNow}
                      >
                      <button className='btnStripe' onClick={save}>PAY NOW</button>
                    </StripeCheckout>
                  </td>
                  <td>
                  <button id="cancelbtn"  onClick={handleClearBooking}>CANCEL</button>
                  </td>
                </tr>
              </table>











              {/* <button type="submit"
                class="btn btn-primary mt-4"
                onClick={save}
                stripeKey={publishableKey}
                label="Pay Now"
                name="Pay With Credit Card"
                amount={priceForStripe}
                description={`Your total is $${product.price}`}
                token={payNow}
                >
                Save
                </button>  */}


            </div>
        </section>



      </div>
      <Footer/>
    </div>
  );
}

export default Booking;