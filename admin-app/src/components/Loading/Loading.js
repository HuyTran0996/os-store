import React from "react";
import "./Loading.scss";

export const Logout = () => {
  return (
    <div className="logout">
      <div className="ring"></div>
      <span>Signing Out...</span>
    </div>
  );
};
export const Loading = () => {
  return (
    <div className="loading">
      <div className="ring"></div>
      <span>Loading...</span>
    </div>
  );
};
