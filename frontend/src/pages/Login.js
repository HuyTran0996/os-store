import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import { loginUser } from "../store/thunks/fetchUsers";

import { Paper, TextField, IconButton, Box } from "@mui/material";
import { showToast } from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../images/logo.png";

import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, isLoading] = useThunk(loginUser);
  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  useEffect(() => {
    if (!parsedUserData?.note) return;
    if (parsedUserData.note === "Your Section Is Expired")
      showToast("Your Section Is Expired", "error");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password });
      showToast("Successfully Login", "success");

      const dataToStore = { email: userData.email, name: userData.name };
      const stringifiedUserData = JSON.stringify(dataToStore);
      if (!localStorage.getItem("userData")) {
        localStorage.setItem("userData", stringifiedUserData);
      }
      if (localStorage.getItem("userData")) {
        localStorage.setItem("userData", stringifiedUserData);
      }
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };

  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />

      <Box size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Box align="center">
            <img src={logo} alt="logo" />
            <h2>Login</h2>
            <p>Login to your account to continue.</p>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              placeholder="Email..."
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Link to="/forgot-password">Forgot password ?</Link>

            <div className="function">
              <Link to="/signup" className="button">
                Signup
              </Link>
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
