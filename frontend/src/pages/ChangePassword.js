import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import { changePassword, logoutUser } from "../store/thunks/fetchUsers";

import { Paper, TextField, IconButton, Box } from "@mui/material";
import { showToast } from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../images/logo.png";

import "../styles/Login.scss";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [change] = useThunk(changePassword);
  const [logOut] = useThunk(logoutUser);

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
      setIsLoading(true);
      await change({ currentPassword, password });
      await logOut();
      showToast(
        "Change password Successfully, please login with your new password",
        "success",
        5000
      );

      setPassword("");
      navigate("/login");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setConfirmPassword(false);
    }
  };

  return (
    <>
      <Meta title="Change Password" />
      <BreadCrumb title="Change Password" />

      <Box size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Box align="center">
            <img src={logo} alt="logo" />
            <h2>Change Password</h2>
            <p>Change your password account.</p>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              placeholder="Enter current password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              className="input"
              placeholder="Enter new password"
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
              placeholder="Confirm new password"
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

export default ChangePassword;
