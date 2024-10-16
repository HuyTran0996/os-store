import React from "react";
import { Box } from "@mui/material";

const ContainerLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "90vh", // header height is 10vh, check in Header AppBar
        padding: "0px 30px",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerLayout;
