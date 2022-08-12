import React, { createRef, useEffect, useState } from "react";
import { Picker } from "emoji-mart";
import { Button, IconButton, Box } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useDispatch, useSelector } from "react-redux";
import { authState, socketState } from "../../../../redux/store";
import { createComment } from "../../../../redux/actions/actionComment";

function InputComment({ post, children, isReply, setIsReply }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [cursorPostion, setCursorPostion] = useState(null);
  const textareaRef = createRef();
  const auth = useSelector(authState);
  const socket = useSelector(socketState);
  const dispatch = useDispatch();

  // States And Functions
  useEffect(() => {
    textareaRef.current.selectionEnd = cursorPostion;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPostion]);

  const handleShowEmoji = () => {
    // textareaRef.current.focus();
    setShowEmoji(!showEmoji);
  };
  // handel add  show in textarea =>(focus curssor )
  const handleAddEmoji = (e) => {
    const emoji = e.native;
    const ref = textareaRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const Comment = start + emoji + end;
    setComment(Comment);
    textareaRef.current.selectionEnd = start.length + emoji.length;
    setCursorPostion(start.length + emoji.length);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      if (setIsReply) return setIsReply(false);
      return;
    }
    const newComment = {
      comment,
      likes: [],
      reply: isReply && isReply._id,
      tag: isReply && isReply.user,
      createdAt: new Date().toISOString(),
      user: auth.user,
    };
    dispatch(createComment({ post, newComment, auth, socket }));
    setComment("");
  };

  return (
    <>
      <form
        onSubmit={handleAddComment}
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid var(--lineColor)",
          position: "relative",
        }}
      >
        <Box position="relative">
          <IconButton onClick={handleShowEmoji}>
            <EmojiEmotionsOutlinedIcon style={{ color: "var(--iconColor)" }} />
          </IconButton>
          {showEmoji && (
            <Box
              sx={{
                position: "absolute",
                overflow: "hidden",
                height: "300px",
                zIndex: 9999,
                left: "0",
                bottom: "50px",
              }}
            >
              <Picker
                onSelect={handleAddEmoji}
                enableFrequentEmojiSort={false}
                showPreview={false}
                showSkinTones={false}
                theme="dark"
                set="twitter"
                color="#000"
              />
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          sx={{ flex: 1 }}
        >
          {children}

          <textarea
            placeholder="Add a comment..."
            ref={textareaRef}
            value={comment}
            dir="auto"
            onChange={(e) => setComment(e.target.value)}
            autoComplete="off"
            style={{
              outlineWidth: "0px",
              color: "#fff",
              backgroundColor: "inherit",
              border: "none",
              flexGrow: 1,
              resize: "none",
              fontSize: "16px",
              marginTop: "19px",
              wordSpacing: "-5px",
              fontWeight: "100",
            }}
          />
          <Button
            sx={{ color: "var(--activeColor) ", fontWeight: "bold" }}
            type="submit"
            onClick={handleAddComment}
            disabled={!comment.trim() && true}
          >
            Add
          </Button>
        </Box>
      </form>
    </>
  );
}

export default InputComment;
