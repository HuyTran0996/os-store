import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginAdminMutation } from "../store/apis/usersApi";

import Grid from "@mui/material/Grid2";
import { Paper, Avatar, TextField, Button, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../styles/Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginAdmin, resutl] = useLoginAdminMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    loginAdmin(user);
  };
  return (
    <Grid container>
      <Grid size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Grid align="center">
            <Avatar className="avatar">
              <h3>
                OS <br /> Store
              </h3>
            </Avatar>
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
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
