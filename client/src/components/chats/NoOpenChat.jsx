import React from "react";
import { Box, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
function NoOpenChat() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="calc(100vh - 40px)"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="130px"
        width="130px"
        borderRadius="50%"
        border="1px solid var(--lineColor)"
      >
        <TelegramIcon style={{ fontSize: 70, color: "var(--iconColor)" }} />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        marginTop="20px"
      >
        <Typography variant="h4">Your Messages</Typography>
        <Typography variant="h6" marginTop="10px">
          Send private photos and messages to a friend.
        </Typography>
      </Box>
    </Box>
  );
}

export default NoOpenChat;
