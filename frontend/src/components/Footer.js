import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "../styles/Header.scss";

import "../styles/Footer.scss";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <Box className="footer">
      <Box className="footerUpper">
        <div className="contact">
          <h4 className="title">Contact Us</h4>
          <div>
            <address>
              No. 1234 Maple Street,
              <br />
              Apartment 5B <br /> Springfield, IL 62702 <br /> PinCode:75000
            </address>
            <a href="tel:+84 123456789">+84 123 456 789</a>
            <br />
            <a href="mailto:test@gmail.com">test@gmail.com</a>

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
            <Link>About Us</Link>
            <Link>Faq</Link>
            <Link>Contact</Link>
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
