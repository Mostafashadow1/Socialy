import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AvatarUser } from "../../../../utils/helper";
import { Box, Stack, Tooltip, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { More } from "components/index";
import { useSelector } from "react-redux";
import { authState } from "../../../../redux/store";
const PostHeader = ({ post, showModelSharePost }) => {
  const auth = useSelector(authState);
  const [more, setMore] = useState(false);
  // Handle Show More
  const handleShowMore = () => {
    setMore(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 5px",
      }}
    >
      <Box display="flex" alignItems="center">
        <Link to={`/profile/${post.user._id}`}>
          <Tooltip title="Profile">
            <Stack>{AvatarUser(post.user.avatar, post.user.username)}</Stack>
          </Tooltip>
        </Link>
        <Stack sx={{ marginLeft: "10px" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "19px",
              fontWeight: "600",
            }}
          >
            {post.user.username}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "13px",
              fontWeight: "500",
              marginTop: "1px",
            }}
          >
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Stack>
      </Box>
      <Box>
        {more && (
          <More
            post={post}
            setMore={setMore}
            auth={auth}
            showModelSharePost={showModelSharePost}
          />
        )}
        <Stack>
          <Tooltip title="more" placement="top" arrow>
            <IconButton onClick={handleShowMore}>
              <MoreHorizIcon style={{ color: "var(--iconColor)" }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
};

export default PostHeader;
