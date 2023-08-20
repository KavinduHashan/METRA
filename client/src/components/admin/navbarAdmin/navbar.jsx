/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar..css";

const Navbar = () => {
  
  return (
    <div className="main">
      <div className="home">
      <section className='head' >
        {/* <AnimationChain className='col-md-8 col-lg-7 col-xl-6'/>
                <MovingComponent className='col-md-8 col-lg-7 col-xl-6'/><br/> */}
      </section><br/><br/><br/>

      <section className="logout">
      <a href="/login">LOGOUT</a>
      </section>
      
        
      <nav className="navigation">
        
        <div className="logo">
        </div>
       
      </nav>
      
      </div>
      

    </div>  
  );
};

export default Navbar;
