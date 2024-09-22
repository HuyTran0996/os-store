import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useThunk } from "../hook/use-thunk";
import { forgotPassword } from "../store/thunks/fetchUsers";

import Grid from "@mui/material/Grid2";
import { Paper, TextField, Button } from "@mui/material";
import { showToast } from "../components/ToastMessage";

import "../styles/Login.scss";

const Forgotpassword = () => {
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
    <Grid container>
      <Grid size={12} className="loginPage">
        <Paper elevation={10} className="paper">
          <Grid align="center">
            <img src="./images/logo.png" alt="logo" />
            <h2>Forgot Your Password?</h2>
            <p>
              Submit your registered email, <br /> we will send you an email to
              guide you reset your password.
            </p>
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
              {isLoading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Forgotpassword;
