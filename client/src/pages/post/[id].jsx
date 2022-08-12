import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authState, reducerDetailPost } from "../../redux/store";
import { getDetailsPost } from "../../redux/actions/actionPost";
import { Typography, Box, Button } from "@mui/material";
import { Post } from "components/index";
import { resMessagesState } from "../../redux/store";
function PagePost() {
  const { error } = useSelector(resMessagesState);
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const detailsPost = useSelector(reducerDetailPost);

  // Get Details Post to Click the Post
  useEffect(() => {
    dispatch(getDetailsPost({ detailsPost, id, auth }));
    if (detailsPost.length > 0) {
      const getDataPost = detailsPost.filter((post) => post._id === id);
      setPost(getDataPost);
    }
  }, [auth, dispatch, id, detailsPost]);

  return (
    <>
      {error && post.length === 0 && (
        <Box sx={{ display: "grid", placeItems: "center", height: "90vh" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">
              OPPS : The link you used may be disabled or this post has been
              deleted
            </Typography>
            <Link to="/">
              <Button>Back To Home</Button>
            </Link>
          </Box>
        </Box>
      )}
      {post.map((dataPost) => (
        <Post key={dataPost._id} post={dataPost} />
      ))}
    </>
  );
}

export default PagePost;
