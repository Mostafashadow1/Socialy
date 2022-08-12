import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Post, LoadMoreButton, Loading, LoadingPosts } from "components/index";
// redux
import { useDispatch, useSelector } from "react-redux";
import { authState, reducerPosts } from "../../redux/store";
import { GetAPIData } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/constant";

function Posts() {
  const homePosts = useSelector(reducerPosts);
  const auth = useSelector(authState);
  const [loading, setLoading] = useState(false);
  const [postsCount, setPostCount] = useState(0);
  const dispatch = useDispatch();
  const { GET_MORE_POST } = POST_TYPES;

  //  count post
  useEffect(() => {
    setPostCount(homePosts?.posts?.length);
  }, [homePosts]);

  // Handle Get More Posts
  const handleShowMorePost = async () => {
    setLoading(true);
    const { data } = await GetAPIData(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    const newData = { ...data, page: homePosts.page + 1 };
    dispatch({ type: GET_MORE_POST, payload: newData });
    setLoading(false);
  };

  return (
    <>
      {(homePosts.loading ? Array.from(new Array(1)) : homePosts.posts).map(
        (post, idx) => (
          <div key={idx}>{post ? <Post post={post} /> : <LoadingPosts />}</div>
        )
      )}

      {!homePosts.loading && postsCount === 0 && (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          No Posts !
        </Typography>
      )}

      {loading ? (
        <Loading width="30px" />
      ) : (
        <LoadMoreButton
          postsCount={postsCount}
          page={homePosts.page}
          loading={loading}
          handleShowMorePost={handleShowMorePost}
        />
      )}
    </>
  );
}

export default Posts;
