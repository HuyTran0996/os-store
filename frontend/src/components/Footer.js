import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "../styles/Header.scss";

import "../styles/Footer.scss";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  const phone = process.env.REACT_APP_PHONE;
  const email = process.env.REACT_APP_EMAIL;
  const address = process.env.REACT_APP_ADDRESS;

  return (
    <Box className="footer">
      <Box className="footerUpper">
        <div className="contact">
          <h4 className="title">Contact Us</h4>
          <div>
            <address>{address}</address>
            <a href={`tel:${phone}`}>{phone}</a>
            <br />
            <a href={`mailto:${email}`}>{email}</a>

            <div className="social">
              <a
                href={`${process.env.REACT_APP_LinkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin />
              </a>
              <a
                href={`${process.env.REACT_APP_Instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </a>
              <a
                href={`${process.env.REACT_APP_Github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub />
              </a>
              <a
                href={`${process.env.REACT_APP_Youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="info">
          <h4 className="title">Information</h4>
          <div className="link">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/refund-policy">Refund Policy</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/term-conditions">Terms of Service</Link>
            <Link to="/blogs">Blogs</Link>
          </div>
        </div>

        <div className="account">
          <h4 className="title">Account</h4>
          <div className="link">
            <Link to="/about">About Us</Link>
            <Link to="/faq">Faq</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </Box>

      <Box className="footerBottom">
        <p>&copy; {new Date().getFullYear()} OS Store - Powered by: OS Store</p>
      </Box>
    </Box>
  );
};

export default Footer;
