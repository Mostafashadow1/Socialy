import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notfound from "assets/images/notfound.png";

function InfoLogin() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Box>
        <img
          src={notfound}
          alt="notfound"
          loding="lazy"
          style={{ width: "100%", height: "240px" }}
        />
      </Box>
      <Box marginTop="40px">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          OOPS .! You're not User
          <Link
            to="/"
            style={{
              marginLeft: "20px",
              color: "var(--activeColor)",
              width: "fit-content",
            }}
          >
            Please Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoLogin;
