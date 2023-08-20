/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import './footerAdmin.css'

const Footer = () => {
    const year = new Date().getFullYear();
  
    return (

        <>
           <footer>
        <div className="f">{`Copyright © METRA ${year}`}</div></footer>
    </>
    )
  };
  
  export default Footer;