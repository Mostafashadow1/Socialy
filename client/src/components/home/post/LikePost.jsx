import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function LikePost({ isLike, handleLike, handleUnLike }) {
  return (
    <>
      {isLike ? (
        <Tooltip title="unLike">
          <IconButton onClick={handleUnLike}>
            <FavoriteIcon style={{ fontSize: "30px", color: "#f00" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="like">
          <IconButton onClick={handleLike}>
            <FavoriteBorderIcon
              style={{ fontSize: "30px", color: "var(--iconColor)" }}
            />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

export default LikePost;
