import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { AvatarUser } from "utils/helper";
function UserChat({ user, active, userMenue, userOnline }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
      style={
        active
          ? { backgroundColor: "var(--secondColor)" }
          : { backgroundColor: "initial" }
      }
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{
          padding: "10px",
          zIndex: 2222,
        }}
      >
        <Box position="relative">
          <Link to={`/profile/${user?._id}`}>
            {AvatarUser(user?.avatar, user?.username, {
              width: 50,
              height: 50,
            })}
          </Link>
          <Box
            backgroundColor={userOnline ? "#4bbc92" : "#ccc"}
            position="absolute"
            width="23px"
            height="23px"
            borderRadius="50%"
            border="3px solid var(--lineColor)"
            right="0px"
            bottom="3px"
            wordBreak=" break-word"
          />
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
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {user.username}
          </Typography>

          {userMenue && user.messageText ? (
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "15px",
              }}
            >
              {userMenue && user.messageText.length > 15
                ? user.messageText.slice(0, 15) + "..."
                : user.messageText}
            </Typography>
          ) : (
            <>
              {userMenue && user.media ? (
                <InsertPhotoOutlinedIcon />
              ) : (
                <Typography variant="h6" fontSize="14px">
                  {user.fullname}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserChat;
