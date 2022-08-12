import React from "react";
import { Box } from "@mui/material";
import image from "assets/images/loading_page.png";
function LoadingPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <img src={image} alt="imageLoading" />
    </Box>
  );
}

export default LoadingPage;
