import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Box } from "@mui/material";
import { useThunk } from "../hook/use-thunk";
import { createEnquiry } from "../store/thunks/fetchEnquiry";

import "../styles/Contact.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";

import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";

const phone = process.env.REACT_APP_PHONE;
const email = process.env.REACT_APP_EMAIL;
const workTime = process.env.REACT_APP_WORK_TIME;
const address = process.env.REACT_APP_ADDRESS;
const googleMap = process.env.REACT_APP_LOCATION_MAP;

const Contact = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const [create, isLoading] = useThunk(createEnquiry);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create({ name, email, phone, message });
      showToast(
        `Your message has been sent, we'll contact you soon`,
        "success"
      );
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };

  return (
    <div className="contactPage">
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Box className="contact-wrapper">
        <iframe
          className="map"
          title="Our Location"
          src={googleMap}
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />

        <div className="contact-inner-wrapper">
          <div className="contactForm">
            <h3 className="contact-title">Contact</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />

              <PhoneInput
                className="form-control"
                placeholder="Phone number..."
                value={phoneNumber}
                onChange={setPhoneNumber}
              />

              <textarea
                className="form-control"
                cols={30}
                rows={4}
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="storeInfo">
            <h3 className="contact-title">Get In Touch With Us</h3>

            <ul>
              <li>
                <AiOutlineHome />
                <address>{address}</address>
              </li>
              <li>
                <BiPhoneCall />
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
              <li>
                <AiOutlineMail />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <BiInfoCircle />
                <p>{workTime}</p>
              </li>
            </ul>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Contact;
