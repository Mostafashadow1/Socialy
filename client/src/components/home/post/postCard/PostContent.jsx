import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ImageSlider } from "components/index";
const PostContent = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", margin: "5px" }}
      >
        {post?.caption && (
          <Typography
            variant="h6"
            sx={{ fontSize: "16px", color: "var(--pColor)" }}
            dir="auto"
          >
            {post?.caption?.length < 100
              ? post?.caption
              : readMore
              ? post?.caption + " "
              : post?.caption?.slice(0, 100) + " ... "}

            {post?.caption?.length > 100 && (
              <Typography
                variant="span"
                sx={{
                  fontSize: "16px",
                  color: "var(--activeColor)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  width: "fit-content",
                }}
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? " Hide Caption " : " Read More "}
              </Typography>
            )}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: "auto",
          maxHeight: 600,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <ImageSlider images={post.images && post.images} />
      </Box>
    </Box>
  );
};

export default PostContent;
