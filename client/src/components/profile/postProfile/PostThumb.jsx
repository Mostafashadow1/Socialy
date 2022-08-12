import React from "react";
import { Link } from "react-router-dom";
import { showVideo, showImage } from "utils/media";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@heroicons/react/solid/ChatIcon";
function PostThumb({ posts }) {
  const styledMedia = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "2px",
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))",
        gridGap: "10px",
        overflow: "hidden",
        margin: "30px 0",
      }}
    >
      {posts &&
        posts?.map((post) => (
          <Link key={post._id} to={`/post/${post?._id}`}>
            <Box
              sx={{
                backgroundColor: "var(--secondColor)",
                minWidth: "300px",
                width: "100%",
                height: "300px",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
                padding: "3px",
              }}
            >
              {post?.images[0]?.secure_url?.match(/video/i)
                ? showVideo(post?.images[0]?.secure_url, styledMedia)
                : showImage(post?.images[0]?.secure_url, styledMedia)}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0009",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: 0,
                  transition: "0.3s",
                  ":hover": {
                    opacity: 1,
                  },
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <FavoriteIcon
                    style={{ color: "#fff", fontSize: "27px", margin: "5px" }}
                  />
                  <Typography
                    variant="h6"
                    color="#fff"
                    fontSize="16px"
                    fontWeight="bold"
                  >
                    {post?.likes.length}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  margin="10px"
                >
                  <ChatIcon
                    style={{ width: "30px", color: "#fff", margin: "5px" }}
                  />
                  <Typography
                    variant="h6"
                    color="#fff"
                    fontSize="16px"
                    fontWeight="bold"
                  >
                    {post.comments?.length}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
    </Box>
  );
}

export default PostThumb;
