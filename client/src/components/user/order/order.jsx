import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './order.css';

import Footer from '../footer/footer'
import Navbar from '../navbar/navbar';

const MySwal = withReactContent(Swal);


const FoodMenu = () => {
  // Define state for food items and selected item
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seatnum, setSeatNum] = useState("");

  let [foodname, setFoodname] = useState("");
  let [quantity, setQuantity] = useState("");
  let [price, setPrice] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/canteens/getcanteen').then((res) => {
      setFoodItems(res.data);
    }).catch((err) => {
      console.log('Error fetching food items:', err);
    });
  }, []);


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

  // handel payment
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
        window.location.href = "./order";
      }

    } catch (error) {
      handleFailure();
      console.log(error);
      window.location.href = "./order";

    }

  }
  };


  // for credit card
  const handleOrderCredit = (event) => {
    event.preventDefault();

    // Validation rules
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name must contain only letters';
    }

    if (!seatnum.trim()) {
      errors.seatnum = 'Seat No is required';
    } if (seatnum > 50) {
      errors.seatnum = 'Invalid Seat number';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }


    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        axios
          .post('http://localhost:4000/canteens/order', {
            itemId: selectedItem._id,
            quantity: 1,
          })
          .then((res) => {
            // alert('Order is Successfully');
            // window.location.href = './order';
            setSelectedItem(null);
            setFoodItems(
              foodItems.map((item) => {
                if (item._id === res.data.item._id) {
                  return res.data.item;
                }
                return item;
              })
            );
  
            axios
              .post('http://localhost:4000/foodorders/addfoodCredit', {
                name: name,
                email: email,
                seatnum: seatnum,
                foodname: foodname,
                quantity: quantity,
                price: price
              })
              .then(() => {
                // Do something if the post request is successful
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log('Error order:', err);
            alert('Food Item is unavailable');
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };


  // for cash on delivery
  const handleOrderCash = (event) => {
    event.preventDefault();

    // Validation rules
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (!nameRegex.test(name)) {
      errors.name = 'Name must contain only letters';
    }

    if (!seatnum.trim()) {
      errors.seatnum = 'Seat No is required';
    } if (seatnum > 50) {
      errors.seatnum = 'Invalid Seat number';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }


    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        axios
          .post('http://localhost:4000/canteens/order', {
            itemId: selectedItem._id,
            quantity: 1,
          })
          .then((res) => {
            alert('Order is Successfully');
            window.location.href = './order';
            setSelectedItem(null);
            setFoodItems(
              foodItems.map((item) => {
                if (item._id === res.data.item._id) {
                  return res.data.item;
                }
                return item;
              })
            );
  
            axios
              .post('http://localhost:4000/foodorders/addfoodCash', {
                name: name,
                email: email,
                seatnum: seatnum,
                foodname: foodname,
                quantity: quantity,
                pay: price
              })
              .then(() => {
                // Do something if the post request is successful
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log('Error order:', err);
            alert('Food Item is unavailable');
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };
  

  return (
    <><div>
      <Navbar/>
      <div className='mapBody'><br/><br/>
      <div className="container" >
        <h1 style={{textAlign:"left"}}>ORDER YOUR DELICIOUS FOODS</h1><br/><br/>
        </div>
        </div> <br /> <br />
        <div className="container" >
    <section className="order-main">
        <div className="order1"><br/>
        <h2>Food Menu</h2><br/>
        <table className='table table-striped'>
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {foodItems.map((item) => (
          <tr key={item._id}>
            <td>{item.foodname}</td>
            <td>{item.quantity}</td>
            <td>LKR{item.price.toFixed(2)}</td>
            <td>
              <button id='orderbttn' onClick={() => setSelectedItem(item)}>Order</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table><br/>
      </div>

      <div className="order2"><br/>
      <h4>Ordering Section</h4>
        <div class="form-outline"><br/>
            {/* <label className="label">name</label> */}
            {errors.name && <span className="errors">{errors.name}</span>}
            <input
              type="text"
              class="form-control mb-2"
              id="name"
              placeholder="Enter Your Full-Name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              } } />
          </div>
          <div class="form-outline">
            {/* <label className="label">name</label> */}
            {errors.email && <span className="errors">{errors.email}</span>}
            <input
              type="email"
              class="form-control mb-2"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              } } />
          </div>
          <div class="form-outline">
            {/* <label className="label">name</label> */}
            {errors.seatnum && <span className="errors">{errors.seatnum}</span>}
            <input
              type="text"
              class="form-control mb-2"
              id="seatnum"
              placeholder="Seat No (Mentioned on your seat)"
              value={seatnum}
              onChange={(event) => {
                setSeatNum(event.target.value);
              } } />
          </div>
          
          
          {selectedItem && (
            <><form>
                <div class="form-outline">
                  <input
                    type="text"
                    style={{color:"blue"}}
                    class="form-control mb-2"
                    id=""
                    value={foodname = selectedItem.foodname}
                    onChange={(event) => {
                      setFoodname(event.target.value);
                    } } 
                    />
                </div>
                <div class="form-outline">
                  <input
                    type="text"
                    style={{color:"blue"}}
                    class="form-control mb-2"
                    id=""
                    value={"LKR: " + (price = selectedItem.price.toFixed(2))}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    } } 
                    />
                </div>
                <div class="form-outline">
                  <input
                    type="text"
                    style={{color:"blue"}}
                    class="form-control mb-2"
                    id=""
                    value={"Quantity: " + (quantity = 1)}
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    } } 
                    />
                </div>

              {/* <p>Order {selectedItem.foodname}</p> */}
              {/* <p>Price: ${selectedItem.price.toFixed(2)}</p> */}
              {/* <p>Quantity: 1</p> */}

            </form><hr/>
            <p>Payment Methods:</p>
            <button type="submit" id='orderbtn'  onClick={handleOrderCash}>Cash on Deliver</button>
            <StripeCheckout
                      stripeKey={publishableKey}
                      label="Pay Now"
                      name="Pay With Credit Card"
                      // billingAddress
                      // shippingAddress
                      currency='LKR'
                      amount={priceForStripe}
                      // description={`Your total is LKR${product.price}`}
                      description={`Your total is LKR${price}`}
                      token={payNow}
                      >
                      <button className='btStripe' onClick={handleOrderCredit}>Credit Card</button>
                    </StripeCheckout>&nbsp;&nbsp;
              {/* <button type="submit" id='orderbtn'  onClick={handleOrder}>ORDER</button> */}
              <button id='ordercnaclebtn' onClick={() => setSelectedItem(null)} ><a href='/order'>CANCEL</a></button>
              {/* <p><a href="/order"  id='ordercnaclebtn'>Click Here to Cancle Order</a></p> */}
              <br/><br/></>
          )}

      </div>
      
    </section> 
            
    </div> <br/><br/><br/>
    <Footer/>
    </div></>
  );
};

export default FoodMenu;