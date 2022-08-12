import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LikePost } from "components/index";

// @mui
import { Box, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "redux/actions/actionPost";
import { authState, socketState } from "redux/store";

const PostActivity = ({ post, showModelSharePost }) => {
  // States And Functions
  const dispatch = useDispatch();
  const socket = useSelector(socketState);
  const auth = useSelector(authState);
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  // Check Post Liked ? set Button LIke : set Button Unlike
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [auth.user, post.likes]);

  // Check Post Saved ? set Button Saved : set Button UnSaved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setIsSave(true);
    } else {
      setIsSave(false);
    }
  }, [auth.user.saved, post._id]);

  // Handle Like
  const handleLike = () => {
    if (likeLoading) return;
    setIsLike(true);
    setLikeLoading(true);
    dispatch(likePost({ post, auth, socket }));
    setLikeLoading(false);
  };

  // Handle Unlike
  const handleUnLike = () => {
    if (likeLoading) return;
    setIsLike(false);
    setLikeLoading(true);
    dispatch(unLikePost({ post, auth, socket }));
    setLikeLoading(false);
  };

  // Handle Save Post
  const handleSavePost = () => {
    setIsSave(true);
    dispatch(savePost({ post, auth }));
  };

  // Handle UnSave Post
  const handleUnSavePost = () => {
    setIsSave(false);
    dispatch(unSavePost({ post, auth }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "5px 10px 0px 10px",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Box>
        <LikePost
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />
        <Link to={`/post/${post?._id}`}>
          <Tooltip title="open">
            <IconButton>
              <AddCircleOutlineOutlinedIcon
                style={{ fontSize: "30px", color: "var(--iconColor)" }}
              />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title="share">
          <IconButton onClick={showModelSharePost}>
            <ShareOutlinedIcon
              style={{ fontSize: "30px", color: "var(--iconColor)" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        {isSave ? (
          <Tooltip title="unSave">
            <IconButton onClick={handleUnSavePost}>
              <BookmarkAddedIcon
                style={{ fontSize: "35px", color: "var(--iconColor)" }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="save">
            <IconButton onClick={handleSavePost}>
              <BookmarkBorderOutlinedIcon
                style={{ fontSize: "35px", color: "var(--iconColor)" }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default PostActivity;
