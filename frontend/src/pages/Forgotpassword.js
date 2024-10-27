import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";

import { forgotPassword } from "../store/thunks/fetchUsers";

import { Paper, TextField, Box } from "@mui/material";
import { showToast } from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import logo from "../images/logo.png";

import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [sendEmail, isLoading] = useThunk(forgotPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await sendEmail({ email });
      showToast(`${data.message}`, "success", 3000);
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };

  return (
    <>
      <Meta title="Forgot Password" />
      <BreadCrumb title="Forgot Password" />

      <Box size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Box align="center">
            <img src={logo} alt="logo" />
            <h2>Forgot Your Password?</h2>
            <p>
              Submit your registered email, <br /> we'll send an email to guide
              you reset your password.
            </p>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              className="input last-input"
              placeholder="Email..."
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Link to="/login">Back To Login Page?</Link>

            <div className="function">
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
