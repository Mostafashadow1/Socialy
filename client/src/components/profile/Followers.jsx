import React from "react";
import { Box, Typography } from "@mui/material";
import { CoverModal, UserCard } from "components/index";
function Followers({ followers, setShowFollowers }) {
  return (
    <Box onClick={() => setShowFollowers(false)}>
      <CoverModal>
        <Box
          sx={{
            width: { xs: "350px", sm: "400px", md: "450x" },
          }}
        >
          <Box>
            <Typography variant="h6" textAlign="center" padding="5px">
              Followers
            </Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #ddd" }} />

          <Box
            sx={{
              minHeight: "200px",
              maxHeight: "400px",
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            {followers.length > 0 ? (
              followers.map((userDataFollower) => (
                <Box key={userDataFollower._id}>
                  <UserCard userData={userDataFollower} />
                </Box>
              ))
            ) : (
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  color: "#575757c2",
                  marginTop: "60px",
                }}
              >
                No Followers ...
              </Typography>
            )}
          </Box>
        </Box>
      </CoverModal>
    </Box>
  );
}

export default Followers;
