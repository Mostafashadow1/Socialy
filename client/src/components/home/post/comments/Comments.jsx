import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Comment } from "components/index";

function Comments({ post }) {
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [nextComment, setNextComment] = useState(2);

  // Comments
  useEffect(() => {
    const newComment = post?.comments?.filter((comment) => !comment.reply);
    setComments(newComment);
    setShowComments(newComment.slice(newComment.length - nextComment));
  }, [nextComment, post.comments]);
  // Reply
  useEffect(() => {
    const commentReply = post?.comments?.filter((comment) => comment.reply);
    setReplyComments(commentReply);
  }, [post.comments]);

  return (
    <>
      {showComments &&
        showComments.map((comment, idx) => (
          <Comment
            key={idx}
            post={post && post}
            comment={comment}
            replyComments={replyComments.filter(
              (item) => item.reply === comment._id
            )}
          />
        ))}

      {comments.length && comments.length - nextComment > 0 ? (
        <Box sx={{ margin: "-10px 0px 5px 0px" }}>
          <Button
            onClick={() => setNextComment(nextComment + 10)}
            sx={{
              color: "var(--activeColor)",
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            See More Comments ...
          </Button>
        </Box>
      ) : (
        comments.length > 2 && (
          <Box sx={{ marginTop: "5px" }}>
            <Button
              sx={{
                color: "var(--activeColor)",
                textTransform: "capitalize",
                fontSize: "12px",
              }}
              onClick={() => setNextComment(2)}
            >
              Hide Comments ...
            </Button>
          </Box>
        )
      )}
    </>
  );
}

export default Comments;
