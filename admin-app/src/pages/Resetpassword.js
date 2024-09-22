import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import { resetPassword } from "../store/thunks/fetchUsers";

import Grid from "@mui/material/Grid2";
import { Paper, TextField, Button, IconButton } from "@mui/material";
import { showToast } from "../components/ToastMessage";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "../styles/Login.scss";

const Resetpassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [reset, isLoading] = useThunk(resetPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      showToast("password and passwordConfirm must be the same", "error");
      return;
    }
    const token = params.token;
    try {
      const data = await reset({ password, token });
      showToast(`${data.message}`, "success");
      navigate("/login");
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    }
  };

  return (
    <Grid container>
      <Grid size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Grid align="center">
            <img src="./images/logo.png" alt="logo" />
            <h2>Reset Password</h2>
            <p>Enter your new password.</p>
          </Grid>

          <form onSubmit={handleSubmit}>
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
              className="input"
              placeholder="Enter new password again"
              type={showPasswordConfirm ? "text" : "password"}
              fullWidth
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      edge="end"
                      onClick={() => setShowPasswordConfirm((show) => !show)}
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                },
              }}
            />

            <Link to="/login">Back To Login Page?</Link>

            <Button
              className="submit"
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Resetpassword;
