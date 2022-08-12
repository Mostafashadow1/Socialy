import {
  PostAPIData,
  DeleteAPIData,
  GetAPIData,
  PatchAPIData,
} from "../../utils/fetchData";
import { GLOBALTYPES, NOTIFICATIONS_TYPES } from "./constant";
const { RESPONSEMESSAGE } = GLOBALTYPES;
const {
  LOADING_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  SOUND,
  IS_READ,
  DELETE_ALL_NOTIFICATION,
} = NOTIFICATIONS_TYPES;

// Add the notification
export const createNotification =
  ({ notificationMsg, auth, socket }) =>
  async (dispatch) => {
    try {
      const { data } = await PostAPIData(
        `notification`,
        notificationMsg,
        auth.token
      );
      socket.emit("createNotification", {
        ...data.notification,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: error.response.data.msg },
      });
    }
  };

// Delete the notification
export const deleteNotification =
  ({ notificationMsg, auth, socket }) =>
  async (dispatch) => {
    try {
      await DeleteAPIData(
        `notification/${notificationMsg.postId}?url=${notificationMsg.url}`,
        auth.token
      );
      socket.emit("deleteNotification", notificationMsg);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: error.response.data.msg },
      });
    }
  };

// Delete the notification
export const getNotification = (token) => async (dispatch) => {
  try {
    const { data } = await GetAPIData(`notification`, token);
    dispatch({ type: LOADING_NOTIFICATIONS, payload: true });
    dispatch({ type: GET_NOTIFICATIONS, payload: { ...data } });
    dispatch({ type: LOADING_NOTIFICATIONS, payload: false });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: { error: error.response.data.msg },
    });
  }
};

// Read Notifications
export const isReadNotification =
  ({ notificationMsg, auth }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: IS_READ,
        payload: { ...notificationMsg, isRead: true },
      });

      PatchAPIData(`readNotification/${notificationMsg._id}`, null, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: error.response.data.msg },
      });
    }
  };

// Open Notifications Sound
export const openNotificationSound = () => async (dispatch) => {
  try {
    dispatch({
      type: SOUND,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: { error: error.response.data.msg },
    });
  }
};

// Close Notifications Sound
export const closeNotificationSound = () => async (dispatch) => {
  try {
    dispatch({
      type: SOUND,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: { error: error.response.data.msg },
    });
  }
};

// Delete All Notifications
export const deleteAllNotifications = (auth) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ALL_NOTIFICATION,
      payload: [],
    });

    await DeleteAPIData("deleteAllNotification", auth.token);
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: { error: error.response.data.msg },
    });
  }
};
