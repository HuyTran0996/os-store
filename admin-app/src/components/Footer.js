import React from "react";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        width: "100%",
        height: "80px",
        backgroundColor: theme.palette.background.paper,
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid #828599",
      }}
    >
      <Typography variant="body2" sx={{ margin: 0, padding: 0 }}>
        &copy; {new Date().getFullYear()} OS Store - Powered by: OS Store
      </Typography>
    </Box>
  );
};

export default Footer;
