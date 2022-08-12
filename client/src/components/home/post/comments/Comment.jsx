import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { CommentCard } from "components/index";
function Comment({ post, comment, replyComments }) {
  // States And Functions
  const [showReplay, setShowReplay] = useState([]);
  const [nextReply, setNextReply] = useState(1);
  useEffect(() => {
    setShowReplay(replyComments.slice(replyComments.length - nextReply));
  }, [replyComments, nextReply]);

  return (
    <CommentCard comment={comment && comment} post={post && post}>
      <Box sx={{ paddingLeft: "10px" }}>
        {showReplay.map(
          (item, idx) =>
            item.reply && <CommentCard key={idx} post={post} comment={item} />
        )}

        {replyComments?.length - nextReply > 0 ? (
          <Box>
            <Button
              onClick={() => setNextReply(nextReply + 9)}
              sx={{
                color: "var(--activeColor) ",
                textTransform: "capitalize",
                fontSize: "12px",
              }}
            >
              See More Replies ...
            </Button>
          </Box>
        ) : (
          replyComments.length > 1 && (
            <Box sx={{ marginTop: "5px" }}>
              <Button
                sx={{
                  color: "var(--activeColor)",
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
                onClick={() => setNextReply(1)}
              >
                Hide Replies ...
              </Button>
            </Box>
          )
        )}
      </Box>
    </CommentCard>
  );
}

export default Comment;
