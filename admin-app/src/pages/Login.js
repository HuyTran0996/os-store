import React from "react";
import { Link } from "react-router-dom";

import "../styles/Login.scss";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <div className="loginPage py-5 d-flex align-items-center">
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login Admin</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <CustomInput type="password" label="Password" id="pass" />
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
