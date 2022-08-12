import React from "react";
import {  Box, Typography } from "@mui/material";
import { AvatarUser } from "../../utils/helper";

function DataSearch({ user }) {
  return (
    <Box
      className="inHover"
      display="flex"
      alignItems="center"
      sx={{
        padding: "10px",
        zIndex: 2222,
      }}
    >
      <Box>
        {AvatarUser(user?.avatar, user.username, {
          width: 45,
          height: 45,
        })}
      </Box>
      <Box
        sx={{
          flex: 1,
          marginTop: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "7px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {user.fullname}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {user.username}
        </Typography>
      </Box>
    </Box>
  );
}

export default DataSearch;
