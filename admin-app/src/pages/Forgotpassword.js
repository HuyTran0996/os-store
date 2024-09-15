import React from "react";

import "../styles/Login.scss";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="loginPage py-5 d-flex align-items-center">
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please enter your email to get reset password mail
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
