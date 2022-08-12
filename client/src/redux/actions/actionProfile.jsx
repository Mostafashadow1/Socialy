import { PROFILE_TYPES, GLOBALTYPES } from "./constant";
import { GetAPIData, PatchAPIData } from "../../utils/fetchData";
import { uploadImages } from "../../utils/uploadImages";
import { deleteData } from "../../utils/helper";
import { createNotification, deleteNotification } from "./actionNotifications";
const { LOADING, GET_USER, FOLLOW, UNFOLLOW, GET_ID, GET_POSTS_PROFILE } =
  PROFILE_TYPES;
const { RESPONSEMESSAGE, AUTH } = GLOBALTYPES;

// Get profile user
export const getUserProfile =
  ({ id, auth }) =>
  async (dispatch) => {
    // Add Profile User Id In State Profile Users
    dispatch({ type: GET_ID, payload: id });
    try {
      dispatch({ type: LOADING, payload: true });
      const resInfo = await GetAPIData(`/user/${id}`, auth.token);
      const resPosts = await GetAPIData(`/posts_user/${id}`, auth.token);

      dispatch({
        type: GET_USER,
        payload: resInfo.data,
      });
      dispatch({
        type: GET_POSTS_PROFILE,
        payload: { ...resPosts.data, _id: id, page: 2 },
      });

      dispatch({ type: LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: err.message,
        },
      });
    }
  };

// Edit Profile
export const updateProfile =
  ({ avatar, file, editUserData, auth, setIsEdit }) =>
  async (dispatch) => {
    if (!editUserData.fullname)
      return dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: "fullname is required" },
      });
    if (editUserData.fullname.length > 22)
      return dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: "fullname must be at least 23 characters" },
      });
    if (editUserData.bio.length > 150)
      return dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: "bio must be at least 151 characters" },
      });

    try {
      let media;
      dispatch({ type: RESPONSEMESSAGE, payload: { loading: true } });
      if (avatar) {
        media = await uploadImages([file]);
      }

      await PatchAPIData(
        "user",
        {
          ...editUserData,
          avatar: avatar ? media[0].secure_url : auth.user.avatar,
        },
        auth.token
      );

      setIsEdit(false);

      dispatch({
        type: AUTH,
        payload: {
          ...auth,
          user: {
            ...editUserData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar,
          },
        },
      });

      dispatch({ type: RESPONSEMESSAGE, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: { error: err.response.data.msg },
        },
      });
    }
  };
// Follow User

export const followUser =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let addFollowAndFollowing;
    
    // Check auth  don't open user profile and follow user
    if (users.every((userFollow) => userFollow._id !== user._id)) {
      addFollowAndFollowing = {
        ...user,
        followers: [...user.followers, auth.user],
      };
    } else {
      // Check auth  open user profile and follow user
      users.forEach((userFollow) => {
        if (userFollow._id === user._id) {
          addFollowAndFollowing = {
            ...userFollow,
            followers: [...userFollow.followers, auth.user],
          };
        }
      });
    }

    dispatch({ type: FOLLOW, payload: addFollowAndFollowing });

    dispatch({
      type: AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: [...auth.user.following, addFollowAndFollowing],
        },
      },
    });
    socket.emit("follow", addFollowAndFollowing);
    try {
      await PatchAPIData(`user/${user._id}/follow`, null, auth.token);

      // Add Notifications
      const notificationMsg = {
        userId: auth.user._id,
        title: "follow youe",
        recipients: [addFollowAndFollowing._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotification({ notificationMsg, auth, socket }));
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: { error: err.response.data.msg },
        },
      });
    }
  };
// UnFollow User
export const unFollowUser =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    // Check auth don't open user profile and follow user
    let removeFollowAndFollowing;
    if (users.every((userFollow) => userFollow._id !== user._id)) {
      removeFollowAndFollowing = {
        ...user,
        followers: deleteData(user.followers, auth.user),
      };
    } else {
      // Check auth  open user profile and follow user
      users.forEach((userFollow) => {
        if (userFollow._id === user._id) {
          removeFollowAndFollowing = {
            ...userFollow,
            followers: deleteData(userFollow.followers, auth.user._id),
          };
        }
      });
    }
    dispatch({ type: UNFOLLOW, payload: removeFollowAndFollowing });

    dispatch({
      type: AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: deleteData(
            auth.user.following,
            removeFollowAndFollowing._id
          ),
        },
      },
    });

    socket.emit("unFollow", removeFollowAndFollowing);

    try {
      await PatchAPIData(`user/${user._id}/unfollow`, null, auth.token);
      // Add Notifications
      const notificationMsg = {
        userId: auth.user._id,
        recipients: [removeFollowAndFollowing._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(deleteNotification({ notificationMsg, auth, socket }));
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: { error: err.response.data.msg },
        },
      });
    }
  };
