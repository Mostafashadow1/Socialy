import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CoverModal({ children, backgroundCalling }) {
  // handle focus in Card
  const handleFocusInCard = (e) => {
    e.stopPropagation();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
      }}
      style={
        backgroundCalling
          ? backgroundCalling
          : { background: "var(--modalColor)" }
      }
    >
      <Box
        sx={{ position: "absolute", top: "3px", right: "1px", zIndex: 999999 }}
      >
        <Tooltip title="Close" sx={{ zIndex: 9999 }}>
          <IconButton>
            <CloseIcon style={{ fontSize: "30px", color: "#ddd" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          backgroundColor: !backgroundCalling && "var(--secondColor)",
          borderRadius: "10px",
        }}
        onClick={handleFocusInCard}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CoverModal;
