import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import { loginAdmin } from "../store/thunks/fetchUsers";

import Grid from "@mui/material/Grid2";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import { showToast } from "../components/ToastMessage";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../images/logo.png";

import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, isLoading] = useThunk(loginAdmin);
  const adminInfo = localStorage.getItem("adminData");
  const parsedAdminData = JSON.parse(adminInfo);

  useEffect(() => {
    if (!parsedAdminData?.note) return;
    if (parsedAdminData.note === "Your Section Is Expired")
      showToast("Your Section Is Expired", "error");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adminData = await login({ email, password });
      showToast("Successfully Login", "success");

      const dataToStore = { email: adminData.email, name: adminData.name };
      const stringifiedAdminData = JSON.stringify(dataToStore);
      localStorage.setItem("adminData", stringifiedAdminData);
      // if (!localStorage.getItem("adminData")) {
      //   localStorage.setItem("adminData", stringifiedAdminData);
      // }
      // if (localStorage.getItem("adminData")) {
      //   localStorage.setItem("adminData", stringifiedAdminData);
      // }
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };

  return (
    <Grid container>
      <Grid size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Grid align="center">
            <img src={logo} alt="logo" />
            <h2>Login</h2>
            <p>Login to your account to continue.</p>
          </Grid>

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

            <Button
              className="submit"
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
