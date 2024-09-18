import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="center">
      <div className="ring"></div>
      <span>Signing Out...</span>
    </div>
  );
};

export default Loading;
