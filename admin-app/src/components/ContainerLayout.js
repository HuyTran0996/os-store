import React from "react";
import { Box } from "@mui/material";

import Footer from "../components/Footer";

const ContainerLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "90vh", // header height is 10vh, check in MainLayout
      }}
    >
      {children}
      <Footer />
    </Box>
  );
};

export default ContainerLayout;
