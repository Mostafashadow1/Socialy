import { uploadImages } from "../../utils/uploadImages";
import { POST_TYPES, GLOBALTYPES } from "./constant";
import {
  GetAPIData,
  PostAPIData,
  PatchAPIData,
  DeleteAPIData,
} from "../../utils/fetchData";
import { createNotification, deleteNotification } from "./actionNotifications";
const {
  CREATE_POST,
  LOADING_POST,
  GET_POSTS,
  UPDATE_POST,
  LIKE_POST,
  UNLIKED_POST,
  GET_DETAILS_POST,
  DELETE_POST,
} = POST_TYPES;

const { RESPONSEMESSAGE, AUTH } = GLOBALTYPES;

// create Post
export const createPost =
  ({ images, caption, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: LOADING_POST, payload: true });
    let media = [];
    try {
      if (images.length > 0) {
        media = await uploadImages(images);
      }
      const { data } = await PostAPIData(
        "posts",
        { images: media, caption },
        auth.token
      );

      dispatch({
        type: CREATE_POST,
        payload: { ...data.newPost, user: auth.user },
      });
      dispatch({ type: LOADING_POST, payload: false });
      // Add Notifications
      const notificationMsg = {
        postId: data.newPost._id,
        title: "added a new post.",
        recipients: data.newPost.user.followers,
        url: `/post/${data.newPost._id}`,
        content: caption,
        image: media[0].secure_url,
      };

      dispatch(createNotification({ notificationMsg, auth, socket }));
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// get all posts user following => home page
export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_POST, payload: true });
    const { data } = await GetAPIData("posts", token);
    dispatch({
      type: GET_POSTS,
      payload: { ...data, postsCount: data.posts.length, page: 2 },
    });
    dispatch({ type: LOADING_POST, payload: false });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

// Update Post After Edit
export const updatePost =
  ({ images, caption, postModelState, auth }) =>
  async (dispatch) => {
    let media = [];
    const oldImage = images.filter((image) => image.secure_url);
    const newImage = images.filter((image) => !image.secure_url);
    if (
      postModelState.caption === caption &&
      newImage.length === 0 &&
      oldImage.length === postModelState.image.length
    )
      return null;

    try {
      dispatch({ type: LOADING_POST, payload: true });
      if (newImage.length > 0) {
        media = await uploadImages(newImage);
      }

      const res = await PatchAPIData(
        `post/${postModelState._id}`,
        {
          caption,
          images: [...oldImage, ...media],
        },
        auth.token
      );
      dispatch({ type: UPDATE_POST, payload: res.data.post });
      dispatch({ type: LOADING_POST, payload: false });
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// Delete Post
export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_POST, payload: post._id });
      const { data } = await DeleteAPIData(`post/${post._id}`, auth.token);
      // Remove Notifications
      const notificationMsg = {
        postId: post._id,
        title: "delete Post",
        recipients: data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(deleteNotification({ notificationMsg, auth, socket }));
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
//  like post
export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    try {
      const postLiked = { ...post, likes: [...post.likes, auth.user] };
      await dispatch({ type: LIKE_POST, payload: postLiked });
      await PatchAPIData(`post/${post._id}/like`, null, auth.token);
      // Add Notifications
      const notificationMsg = {
        postId: auth.user._id,
        title: "like your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.caption,
        image: post.images[0].secure_url,
      };
      dispatch(createNotification({ notificationMsg, auth, socket }));
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// UnLiked post
export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    try {
      const postUnLiked = {
        ...post,
        likes: [...post.likes.filter((like) => like._id !== auth.user._id)],
      };
      await dispatch({ type: UNLIKED_POST, payload: postUnLiked });
      await PatchAPIData(`post/${post._id}/unliked`, null, auth.token);
      // Remove Notifications
      const notificationMsg = {
        postId: auth.user._id,
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(deleteNotification({ notificationMsg, auth, socket }));
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// Get detailsPost
export const getDetailsPost =
  ({ detailsPost = [], id, auth }) =>
  async (dispatch) => {
    // Add This Condotion => (Render state UseEffect)
    if (detailsPost.every((post) => post._id !== id)) {
      try {
        const { data } = await GetAPIData(`post/${id}`, auth.token);
        dispatch({ type: GET_DETAILS_POST, payload: data.post });
      } catch (error) {
        dispatch({
          type: RESPONSEMESSAGE,
          payload: {
            error: error.response.data.msg,
          },
        });
      }
    }
  };

// Save Post in User
export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    try {
      const newUser = {
        ...auth.user,
        saved: [...auth.user.saved, post._id],
      };
      dispatch({ type: AUTH, payload: { ...auth, newUser } });
      await PatchAPIData(`save_post/${post._id}`, null, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// Un Save Post in User
export const unSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    try {
      const newUser = {
        saved: auth.user.saved.filter((id) => id !== post._id),
      };
      dispatch({ type: AUTH, payload: { ...auth, newUser } });
      await PatchAPIData(`unsave_post/${post._id}`, null, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
