/* eslint-disable no-unused-vars */
import React from 'react';
import {  useState } from "react";
import './foodordermain.css'
import axios from "axios";

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';


const FoodOrderMain = () => {

  return (
    <div className="food-home">
      <Navbar />
      <section className="food">
        <div className="food-content"><br/><br/><br/><br/>
          <h3>ORDER YOUR FOOD</h3><br/><br/>
          {/* <p>description.......................</p> */}
        </div>
      </section> <br /> <br />

      <div className="container" style={{color:"black"}}>
        <p>Our website offers an efficient online food ordering system for train passengers. With just a few clicks, passengers can access a wide range of delicious meal options, customize their orders, and securely pay online. We ensure timely delivery of fresh and tasty meals directly to their seats, enhancing their train travel experience. Our website is designed to provide a seamless and user-friendly interface, making it easy for passengers to browse menus, select their preferred meals, and enjoy a hassle-free food ordering process during their journey.</p>
      </div><br /> <br />

      {/* <section className="food-hero-flex">
        <div className="food-hero-content-flex">
          <h1>Welcome to My Website</h1>
          <p>This is a sample website to demonstrate the use of React and CSS.</p>
          <button>Learn More</button>
        </div>

        <div className="food-hero-content-flex">
          <h1>Welcome to My Website</h1>
          <p>This is a sample website to demonstrate the use of React and CSS.</p>
          <button>Learn More</button>
        </div>
      </section> */}
      <div className="">
      <section className="food-features">
        <div className="food-feature1">
        <br/><br/><br/><br/>
          <a href='/order'>ORDER</a>
        </div>
        <div className="food-feature2">
        <br/><br/><br/><br/>
          <a href='/order'>ORDER</a>
        </div>
        <div className="food-feature3">
        <br/><br/><br/><br/>
          <a href='/order'>ORDER</a>
        </div>
      </section><br/><br/>

      
      </div><br/><br/><br/>

      <Footer/>
      
    </div>
  );
};

export default FoodOrderMain;
