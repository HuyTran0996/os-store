import React from "react";

// import "../styles/Color.scss";

const Color = (colorCode) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: colorCode,
      }}
    ></div>
  );
};

export default Color;
