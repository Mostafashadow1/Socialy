import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FollowButtonToggle } from "components/index";
import { authState } from "../redux/store";
import { useSelector } from "react-redux";
import { AvatarUser } from "../utils/helper";

function UserCard({ userData }) {
  const auth = useSelector(authState);
  return (
    <Box
      className="inHover"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          padding: "10px",
          zIndex: 2222,
        }}
      >
        <Box>
          {AvatarUser(userData?.avatar, userData?.username, {
            width: "45px",
            height: "45px",
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
          <Link to={`/profile/${userData?._id}`}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {userData?.fullname}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
            >
              {userData?.username}
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box marginRight="5px">
        {userData?._id !== auth?.user?._id && (
          <FollowButtonToggle user={userData && userData} />
        )}
      </Box>
    </Box>
  );
}

export default UserCard;
