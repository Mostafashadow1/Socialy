import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { GetAPIData } from "../../utils/fetchData";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/constant";
import { Loading, PostThumb, LoadMoreButton } from "components/index";

function PostsSaved({ auth }) {
  const { RESPONSEMESSAGE } = GLOBALTYPES;
  const dispatch = useDispatch();
  const [postsSaveData, setPostsSaveData] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  // Get Posts Saved in User
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      setLoading(true);
      const { data } = await GetAPIData(`get_posts_save`, auth.token);
      setPostsSaveData(data.posts);
      setPostsCount(data.postsCount);
      setLoading(false);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }, [RESPONSEMESSAGE, auth, dispatch]);
  // Handle Get More Posts
  const handleShowMorePost = async () => {
    setLoading(true);
    const { data } = await GetAPIData(
      `get_posts_save?limit=${page * 9}`,
      auth.token
    );
    setPostsSaveData(data.posts);
    setPostsCount(data.postsCount);
    setPage(page + 1);
    setLoading(false);
  };
  return (
    <>
      {postsCount > 0 && <PostThumb posts={postsSaveData} />}
      {!loading && postsCount === 0 && (
        <Box
          marginTop="50px"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            border="1px solid #000"
            borderRadius="50%"
            height="65px"
            width="65px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="10px"
          >
            <BookmarkBorderOutlinedIcon style={{ fontSize: "40px" }} />
          </Box>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="500"
            margin="10px"
          >
            Save
          </Typography>
          <Typography
            margin="10px"
            variant="h6"
            textAlign="center"
            minWidth="240px"
            maxWidth="500px"
          >
            Save photos that you want to see again. No one is notified, and only
            you can see what you've saved.
          </Typography>
        </Box>
      )}

      {loading ? (
        <Loading width="40px" />
      ) : (
        <LoadMoreButton
          postsCount={postsCount}
          page={page}
          loading={loading}
          handleShowMorePost={handleShowMorePost}
        />
      )}
    </>
  );
}

export default PostsSaved;
