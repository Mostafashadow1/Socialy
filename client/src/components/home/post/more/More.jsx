import React from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../utils/config";
import { CoverModal } from "components/index";
import styles from "./stylesMore.module.css";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../../../redux/actions/constant";
import { deletePost } from "../../../../redux/actions/actionPost";
import { socketState } from "../../../../redux/store";
function More({ auth, post, setMore, showModelSharePost }) {
  // STates And Functions
  const { MODEL_POST } = GLOBALTYPES;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector(socketState);
  // Handle Edit Post
  const handleEditPost = () => {
    dispatch({ type: MODEL_POST, payload: { ...post, isEdit: true } });
    setMore(false);
  };
  // Handle Delete Post
  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post")) {
      await dispatch(deletePost({ post, auth, socket }));
      navigate("/");
    }
    setMore(false);
  };
  // Handle Copy Post Link
  const handleCopyPostLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    setMore(false);
  };

  return (
    <Box onClick={() => setMore(false)}>
      <CoverModal>
        <Box
          className={styles.styledCardApp}
          sx={{ width: { xs: "93vw", sm: "350px", md: "450px" } }}
        >
          <Box>
            {post.user._id === auth.user._id && (
              <>
                <Box className={styles.styledCard}>
                  <button
                    onClick={handleDeletePost}
                    className={`${styles.styledButton} ${styles.delete_btn}`}
                  >
                    Delete
                  </button>
                </Box>
                <Box className={styles.styledCard}>
                  <button
                    className={styles.styledButton}
                    onClick={handleEditPost}
                  >
                    Edit Post
                  </button>
                </Box>
              </>
            )}

            <Link to={`/post/${post._id}`}>
              <Box className={styles.styledCard}>
                <button className={styles.styledButton}>Go to post</button>
              </Box>
            </Link>
            <Box className={styles.styledCard}>
              <button
                className={styles.styledButton}
                onClick={showModelSharePost}
              >
                Share to...
              </button>
            </Box>
            <Box className={styles.styledCard}>
              <button
                className={styles.styledButton}
                onClick={handleCopyPostLink}
              >
                Copy Link
              </button>
            </Box>

            <Box className={styles.styledCard}>
              <button
                className={styles.styledButton}
                onClick={() => setMore(false)}
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

export default More;
