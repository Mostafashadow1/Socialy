import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import notfound from "assets/images/notfound.png";
function Notfound() {
  const [isNotFound, setIsNotFound] = useState(false);
  // handle show
  useEffect(() => {
    const time = setTimeout(() => {
      setIsNotFound(true);
    }, 500);

    return () => clearTimeout(time);
  }, []);
  return (
    <Container maxWidth="lg">
      {isNotFound && (
        <Box padding="30px 0px">
          <Box>
            <img
              src={notfound}
              alt="image_notfound"
              style={{ width: "100%", height: "240px" }}
            />
          </Box>
          <Box mt="10px">
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Sorry, this page isn't available.
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              The link you followed may be broken , Go back to
            </Typography>
            <Link
              style={{
                textDecoration: "none",
                color: "#2196f3",
                textAlign: "center",
              }}
              to="/"
            >
              <Typography variant="h5" className="logo_text">
                Soicaly
              </Typography>
            </Link>
          </Box>
        </Box>
        // <Box
        //   display="flex"
        //   alignItems="center"
        //   sx={{ flexDirection: "column" }}
        // >
        //   <Box sx={{ m: "3rem" }}>
        //     <Link to="/">
        //       <img
        //         src={Logo}
        //         alt="logo"
        //         style={{
        //           width: "110px",
        //           objectFit: "contain",
        //           display: "block",
        //           margin: "10px auto",
        //           cursor: "pointer",
        //         }}
        //         loading="lazy"
        //       />
        //     </Link>
        //     <Typography variant="h6" sx={{ textAlign: "center" }}>
        //       Sorry, this page isn't available.
        //     </Typography>
        //   </Box>
        //   <Box>
        //     <Typography variant="h6" sx={{ textAlign: "center" }}>
        //       The link you followed may be broken, or the page may have been
        //       removed.
        //       <Link style={{ textDecoration: "none", color: "#2196f3" }} to="/">
        //         Go back to Instagram.
        //       </Link>
        //     </Typography>
        //   </Box>
        // </Box>
      )}
    </Container>
  );
}

export default Notfound;
