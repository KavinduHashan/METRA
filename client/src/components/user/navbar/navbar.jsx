/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

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
      type="glowing"
      duration="1000ms"
      delay="0s"
      direction="alternate"
      timing="ease"
      iteration="infinite"
      fillMode="none"
      >
      <p style={{ fontSize: "50px", fontFamily: 'Arial Black', textAlign: 'center', fontWeight: 'bold' }}>
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
      <h5 style={{fontFamily:'Consolas', textAlign:'center',color: 'white' }}>Sri Lankan Railway Management System</h5>
    </MovingComponent>

    </>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(isOpen);
  };

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
        <ul className={isOpen ? "nav-links active" : "nav-links"}>
        <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <Link to="/schedule">SCHEDULE</Link>
          </li>
          <li>
            <Link to="/foodordermain">FOOD ORDER</Link>
          </li>
          <li>
            <Link to="/location">LOCATION</Link>
          </li>
          <li>
            <Link to="/complaint">COMPLAINT</Link>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleNav}>
          <div className="line"><Link to="/about"></Link></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
      
      </div>
      

    </div>  
  );
};

export default Navbar;
