import React, { useState } from "react";
import { AvatarUser } from "utils/helper";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  LikeButton,
  MoreComment,
  EditComment,
  InputComment,
} from "components/index";
// @mui
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// redux
import { authState, socketState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "redux/actions/actionComment";
function CommentCard({ children, comment, post }) {
  // States and Functions
  const auth = useSelector(authState);
  const socket = useSelector(socketState);
  const dispatch = useDispatch();
  const [readMore, setReadMore] = useState(false);
  const [more, setMore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);

  // Show EDit Box
  const handleShowEditContent = () => {
    setMore(false);
    setIsEdit(true);
  };

  // Handle Replay in Comment
  const handleReply = () => {
    if (isReply) {
      return setIsReply(false);
    }
    setIsReply({ ...comment });
  };

  // Handle Remove Comment
  const handleRemoveComment = () => {
    if (
      post?.user?._id === auth?.user._id ||
      comment?.user?._id === auth?.user._id
    ) {
      dispatch(deleteComment({ post, comment, auth, socket }));
      setMore(false);
    }
  };

  // Styles
  const styleCommentApp = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid var(--lineColor)",
          padding: "5px 1px 0px 7px",
          margin: "10px 0px",
          borderRadius: "5px",
        }}
        style={styleCommentApp}
      >
        <Box sx={{ display: "flex", margin: "10px 5px 0px 0px" }}>
          <Link to={`/profile/${comment?.user?._id}`}>
            <Box>
              {AvatarUser(comment?.user?.avatar, comment?.user?.username, {
                width: 27,
                height: 27,
              })}
            </Box>
          </Link>
          <Link to={`/profile/${comment?.user?._id}`}>
            <Box sx={{ marginLeft: "5px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                {comment?.user?.username}
              </Typography>
            </Box>
          </Link>
        </Box>

        {isEdit ? (
          <EditComment
            comment={comment}
            setIsEdit={setIsEdit}
            auth={auth}
            post={post}
          />
        ) : (
          <Box margin="5px" display="flex" justifyContent="space-between">
            <Box sx={{ flexGrow: "1" }}>
              <Typography
                variant="caption"
                sx={{ fontSize: "16px", fontWeight: "500", marginLeft: "5px" }}
              >
                {comment?.tag && comment?.tag?._id === comment?.user?._id && (
                  <Link to={`/profile/${comment?.tag?._id}`}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        marginRight: "5px",
                        display: "inline-block",
                      }}
                    >
                      @{comment?.tag?.username} :
                    </Typography>
                  </Link>
                )}
                <Typography sx={{ wordBreak: "break-all" }}>
                  {comment.comment?.length < 100
                    ? comment?.comment
                    : readMore
                    ? comment?.comment
                    : comment.comment?.slice(0, 70) + "..."}
                </Typography>
              </Typography>
              <Typography
                variant="caption"
                onClick={() => setReadMore(!readMore)}
                sx={{
                  color: "var(--activeColor)",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {comment.comment?.length > 100
                  ? readMore
                    ? "Hide Content"
                    : "Show More"
                  : null}
              </Typography>
            </Box>
            <Box>
              <LikeButton comment={comment} post={post} auth={auth} />
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", margin: "0px 5px" }}>
          <Box sx={{ marginRight: "5px" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "12px", fontWeight: "200" }}
            >
              {moment(comment?.createdAt).fromNow()}
            </Typography>
          </Box>
          {!isEdit && (
            <>
              <Box sx={{ marginRight: "5px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {comment.likes?.length} likes
                </Typography>
              </Box>
              <Box sx={{ marginRight: "5px" }}>
                <Button
                  sx={{ color: "#fff", textTransform: "capitalize" }}
                  onClick={handleReply}
                >
                  0 {!isReply ? "Reply" : "Cancel"}
                </Button>
              </Box>

              {(post?.user?._id === auth?.user._id ||
                comment.user?._id === auth?.user?._id) && (
                <Tooltip title="more" placement="top" arrow>
                  <IconButton onClick={() => setMore(true)}>
                    <MoreHorizIcon style={{ color: "var(--iconColor)" }} />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Box>
        {more && (
          <MoreComment
            handleRemoveComment={handleRemoveComment}
            setMore={setMore}
            setIsEdit={setIsEdit}
            handleShowEditContent={handleShowEditContent}
            post={post}
            comment={comment}
            auth={auth}
          />
        )}
        {isReply && (
          <InputComment post={post} isReply={isReply} setIsReply={setIsReply}>
            <Link to={`/profile/${isReply?.user?._id}`}>
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  margin: "5px",
                  fontWeight: "400",
                }}
              >
                @{isReply.user.username} :
              </Typography>
            </Link>
          </InputComment>
        )}
      </Box>
      {children}
    </>
  );
}

export default CommentCard;
