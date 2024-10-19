import React from "react";
import { Box } from "@mui/material";

const ContainerLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        padding: "0px 50px",
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerLayout;
