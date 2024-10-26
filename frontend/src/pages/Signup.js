import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import {
  signupUser,
  userWishList,
  getUserCart,
} from "../store/thunks/fetchUsers";

import { Paper, TextField, IconButton, Box } from "@mui/material";
import { showToast } from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../images/logo.png";

import "../styles/Login.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, isLoading] = useThunk(signupUser);
  const [getUserWishList] = useThunk(userWishList);
  const [getCart] = useThunk(getUserCart);

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  useEffect(() => {
    if (!parsedUserData?.note) return;
    if (parsedUserData.note === "Your Section Is Expired")
      showToast("Your Section Is Expired", "error");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Password and confirm password are not match", "error");
      return;
    }
    try {
      const userData = await signup({ name, email, phone, password });
      await getUserWishList();
      const userCart = await getCart();

      showToast("Sign up Successfully", "success");

      const dataToStore = { _id: userData._id };

      localStorage.setItem("userData", JSON.stringify(dataToStore));
      localStorage.setItem("userCart", JSON.stringify(userCart));
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };

  return (
    <>
      <Meta title="Sign up" />
      <BreadCrumb title="Sign up" />

      <Box size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Box align="center">
            <img src={logo} alt="logo" />
            <h2>Sign Up</h2>
            <p>Sign up your account to continue.</p>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              placeholder="User Name..."
              type="text"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className="input"
              placeholder="Email..."
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
            />

            <TextField
              className="input"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
            />

            <TextField
              className="input last-input"
              placeholder="Confirm password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
            />

            <Link to="/login">Back To Login Page ?</Link>

            <div className="function">
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
