import React, { useEffect, useState } from "react";
// @mui
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  likeComment,
  unLikeComment,
} from "../../../../redux/actions/actionComment";
import { socketState } from "../../../../redux/store";
const LikeButton = ({ comment, post, auth }) => {
  const socket = useSelector(socketState);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  useEffect(() => {
    if (comment?.likes?.find((like) => like._id === auth.user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [auth.user._id, comment.likes, like]);

  // like Comment
  const handleLike = () => {
    if (loadLike) return;
    setLoadLike(true);
    setLike(true);
    dispatch(likeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };
  // unLike Comment
  const handleUnLike = () => {
    if (loadLike) return;
    setLoadLike(true);
    setLike(false);
    dispatch(unLikeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  return (
    <>
      {like ? (
        <IconButton onClick={handleUnLike}>
          <FavoriteIcon style={{ color: "#f00", fontsize: "10px" }} />
        </IconButton>
      ) : (
        <IconButton onClick={handleLike}>
          <FavoriteBorderIcon style={{ color: "var(--iconColor)" }} />
        </IconButton>
      )}
    </>
  );
};

export default LikeButton;
