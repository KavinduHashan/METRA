/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
      <p style={{ fontSize: "100px", fontFamily: 'Arial Black', fontWeight: 'bold' }}>
        METRA<br />
      </p>

    </MovingText>

    {/* <MovingComponent
      type="shakeMix"
      duration="2000ms"
      delay="0s"
      direction="alternate"
      timing="ease"
      iteration="infinite"
      fillMode="none"
      >
      <h5 style={{fontFamily:'Consolas',color: 'white' }}>Sri Lankan Railway Management System</h5>
    </MovingComponent> */}

    </>
  )
}

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(isOpen);
  };

  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const wallpapers = [
    'https://www.journeyera.com/wp-content/uploads/2017/10/untitled-0251.jpg',
    'https://as2.ftcdn.net/v2/jpg/01/91/92/11/1000_F_191921162_9mtSSwTTMQJ9cnCWCmHaDylCs4joFheE.jpg',
    'https://www.journeyera.com/wp-content/uploads/2017/10/untitled-9827.jpg',
    'https://as2.ftcdn.net/v2/jpg/01/91/35/85/1000_F_191358524_fgQSOIJM7AGwwjsySsfb1TWQ5s0KOQGt.jpg'
  ];

  useEffect(() => {
    const wallpaperTimer = setInterval(() => {
      setCurrentWallpaper((prevWallpaper) =>
        (prevWallpaper + 1) % wallpapers.length
      );
    }, 5000);

    return () => {
      clearInterval(wallpaperTimer);
    };
  }, [wallpapers.length]);

  const wallpaperStyle = {
    backgroundImage: `url(${wallpapers[currentWallpaper]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh'
  };
  

  return (
    <div className="home-main">

      <div style={wallpaperStyle}>
        
      {/* <nav className="home-navigation">
        <div className="logo">
        </div>
        <ul className={isOpen ? "nav-links active" : "home-nav-links"}>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <Link to="/schedule">SCHEDULE</Link>
          </li>
          <li>
            <Link to="/foodordermain">FOOD</Link>
          </li>
          <li>
            <Link to="/location">LOCATION</Link>
          </li>
          <li>
            <Link to="/complaint">COMPLAINT</Link>
          </li>
        </ul>
        <div className="home-hamburger" onClick={toggleNav}>
          <div className="line"><Link to="/about">About</Link></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav> */}
      <section className='home-head' ><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <h2 className="home-h1Nav">WELCOME TO</h2>
          <AnimationChain className='col-md-4 col-lg-7 col-xl-6'/>
          {/* <MovingComponent className='col-md-8 col-lg-7 col-xl-6'/><br/> */}
          <h4 className="home-h1Nav" style={{fontFamily:'Consolas' }}>Sri Lankan Railway Management System</h4><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </section>

      {/* <section className='home-head-two' >
          <h5 style={{fontFamily:'Consolas',color: 'white' }}>WELCOMEjhvsffffffffffffffffffhb TO</h5>
          
      </section> */}
      </div>

     
      

    </div>  
  );
};

export default HomeNavbar;
