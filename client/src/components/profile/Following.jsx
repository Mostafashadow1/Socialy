import { Box, Typography } from "@mui/material";
import React from "react";
import { CoverModal, UserCard } from "components/index";
function Following({ following, setShowFollowing }) {
  return (
    <Box onClick={() => setShowFollowing(false)}>
      <CoverModal>
        <Box
          sx={{
            width: { xs: "350px", sm: "400px", md: "450x" },
          }}
        >
          <Box padding="10px">
            <Typography variant="h6" textAlign="center">
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
              margin: "5px",
            }}
          >
            {following.length > 0 ? (
              following.map((userDataFollowing, idx) => (
                <UserCard key={idx} userData={userDataFollowing} />
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
                No Following ...
              </Typography>
            )}
          </Box>
        </Box>
      </CoverModal>
    </Box>
  );
}

export default Following;
