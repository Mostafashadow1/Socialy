import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PROFILE_TYPES } from "../../redux/actions/constant";
import { GetAPIData } from "../../utils/fetchData";
import { useParams } from "react-router";
import { Loading, LoadMoreButton, PostThumb } from "components/index";
import { Box, Typography } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
function Posts({ auth, profileUser }) {
  const { GET_MORE_POST } = PROFILE_TYPES;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(2);
  const [postsCount, setPostsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // Check posts mine user ? put posts userPosts

  useEffect(() => {
    profileUser?.posts.forEach((postsData) => {
      if (postsData._id === id) {
        setPostsData(postsData.posts);
        setPostsCount(postsData.posts.length);
        setPage(postsData.page);
      }
    });
  }, [profileUser?.posts, id]);

  // Handle Get More Posts
  const handleShowMorePost = async () => {
    setLoading(true);
    const { data } = await GetAPIData(
      `posts_user/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...data, page: page + 1, _id: id };
    dispatch({ type: GET_MORE_POST, payload: newData });
    setLoading(false);
  };

  return (
    <>
      {postsCount > 0 && <PostThumb posts={postsData} />}
      {!loading && postsCount === 0 && (
        <Box
          margin="40px 0px"
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
            <PhotoCameraOutlinedIcon style={{ fontSize: "40px" }} />
          </Box>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="500"
            margin="10px"
          >
            No Posts Yet
          </Typography>
          <Typography
            margin="10px"
            fontSize="16px"
            variant="h6"
            textAlign="center"
          >
            Start capturing and sharing your moments
          </Typography>
        </Box>
      )}

      {loading ? (
        <Loading width="30px" />
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

export default Posts;
