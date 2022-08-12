import React, { createRef, useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateComment } from "../../../../redux/actions/actionComment";
import { Picker } from "emoji-mart";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { socketState } from "../../../../redux/store";

function EditComment({ comment, setIsEdit, post, auth }) {
  // States And Functions
  const dispatch = useDispatch();
  const socket = useSelector(socketState);
  const textareaRef = createRef();
  const [editComment, setEditComment] = useState(comment.comment);
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPostion, setCursorPostion] = useState(null);

  useEffect(() => {
    textareaRef.current.selectionEnd = cursorPostion;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPostion]);

  const handleShowEmoji = () => {
    textareaRef.current.focus();
    setShowEmoji(!showEmoji);
  };
  // handel add  show in textarea =>(focus curssor )
  const handleAddEmoji = (e) => {
    const emoji = e.native;
    const ref = textareaRef.current;
    ref.focus();
    const start = editComment.substring(0, ref.selectionStart);
    const end = editComment.substring(ref.selectionStart);
    const Comment = start + emoji + end;
    setEditComment(Comment);
    textareaRef.current.selectionEnd = start.length + emoji.length;
    setCursorPostion(start.length + emoji.length);
  };

  const handleEdit = () => {
    if (comment === editComment.trim()) {
      setIsEdit(false);
    } else {
      dispatch(updateComment({ comment, editComment, post, auth, socket }));
      setIsEdit(false);
    }
  };

  return (
    <>
      <form style={{ margin: "10px", position: "relative" }}>
        <textarea
          value={editComment}
          ref={textareaRef}
          rows="4"
          onChange={(e) => setEditComment(e.target.value)}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: "5px",
            padding: "10px",
            border: "1px solid var(--lineColor",
            fontWeight: "500",
            fontSize: "17px",
            backgroundColor: "inherit",
            color: "#fff",
          }}
        />
        <Box sx={{ marginRight: "5px" }}>
          <IconButton onClick={handleShowEmoji}>
            <EmojiEmotionsIcon style={{ color: "var(--iconColor) " }} />
          </IconButton>
          <Button variant="" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
          <Button sx={{ color: "var(--activeColor)" }} onClick={handleEdit}>
            Update
          </Button>
        </Box>
      </form>
      {showEmoji && (
        <Box
          sx={{
            overflow: "hidden",
            height: "300px",
            zIndex: 9999,
            width: "fit-content",
          }}
        >
          <Picker
            onSelect={handleAddEmoji}
            enableFrequentEmojiSort={false}
            showPreview={false}
            showSkinTones={false}
            set="twitter"
            color="#000"
            theme="dark"
          />
        </Box>
      )}
    </>
  );
}

export default EditComment;
