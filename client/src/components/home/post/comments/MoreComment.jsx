import React from "react";
import { Box } from "@mui/material";
import styles from "../more/stylesMore.module.css";
import { CoverModal } from "components/index";
function MoreComment({
  post,
  comment,
  auth,
  setMore,
  handleShowEditContent,
  handleRemoveComment,
}) {
  // MY Post Function
  const MyPost = () => {
    return (
      <>
        <Box className={styles.styledCard}>
          <button
            className={`${styles.styledButton} ${styles.delete_btn}`}
            onClick={handleRemoveComment}
          >
            Delete Comment
          </button>
        </Box>
        <Box className={styles.styledCard}>
          <button
            className={styles.styledButton}
            onClick={handleShowEditContent}
          >
            Edit Comment
          </button>
        </Box>
      </>
    );
  };

  return (
    <Box onClick={() => setMore(false)}>
      <CoverModal>
        <Box
          className={styles.styledCardApp}
          sx={{ width: { xs: "93vw", sm: "350px", md: "450px" } }}
        >
          <Box>
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MyPost()
              ) : (
                <Box className={styles.styledCard}>
                  <button
                    onClick={handleRemoveComment}
                    className={`${styles.styledButton} ${styles.delete_btn}`}
                  >
                    Delete Comment
                  </button>
                </Box>
              )
            ) : (
              comment.user._id === auth.user._id && MyPost()
            )}

            <Box className={styles.styledCard}>
              <button
                onClick={() => setMore(false)}
                className={styles.styledButton}
              >
                Cancel
              </button>
            </Box>
          </Box>
        </Box>
      </CoverModal>
    </Box>
  );
}

export default MoreComment;
