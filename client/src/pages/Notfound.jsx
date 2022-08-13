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
       
      )}
    </Container>
  );
}

export default Notfound;
