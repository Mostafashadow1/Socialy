import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { BASE_URL } from "../../../utils/config";

import {
  Comments,
  InputComment,
  ShareModal,
  PostHeader,
  PostContent,
  PostActivity,
} from "components/index";

function Post({ post }) {
  // Functions and States
  const [isShare, setIsShare] = useState(false);
  // Show Model Share Post
  const showModelSharePost = () => {
    setIsShare(!isShare);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid var(--lineColor)",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        <PostHeader
          post={post && post}
          showModelSharePost={showModelSharePost}
        />
        <PostContent post={post && post} />
        <PostActivity
          post={post && post}
          showModelSharePost={showModelSharePost}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 10px",
          }}
        >
          <Box sx={{ marginLeft: "10px" }}>
            <Typography variant="h6" style={{ fontSize: "15px" }}>
              {post?.likes?.length} likes
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" style={{ fontSize: "15px" }}>
              {post?.comments?.length} Comments
            </Typography>
          </Box>
        </Box>
        <Box marginTop="20px">
          <Comments post={post && post} />
          <InputComment post={post && post} />
        </Box>
      </Box>

      {isShare && (
        <ShareModal
          setIsShare={setIsShare}
          url={`${BASE_URL}/post/${post?._id}`}
        />
      )}
    </>
  );
}

export default Post;
