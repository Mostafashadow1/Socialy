import { GLOBALTYPES, CHATS_TYPES } from "./constant";
import { DeleteAPIData, GetAPIData, PostAPIData } from "../../utils/fetchData";
import { deleteData } from "../../utils/helper";
const { RESPONSEMESSAGE } = GLOBALTYPES;
const {
  OPEN_CHAT_USER,
  SEND_MESSAGE,
  GET_CHATS,
  GET_MESSAGES,
  LOADE_MORE_MESSAGES,
  DELETE_MESSAGE,
  DELETE_CHAT,
} = CHATS_TYPES;

// open chat User
export const openChatUser =
  ({ user, chats }) =>
  async (dispatch) => {
    // Check user is not found
    if (chats.chatsUsers.every((userState) => userState._id !== user._id)) {
      dispatch({ type: OPEN_CHAT_USER, payload: user });
    }

  };

// send message  in chat User
export const sendMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: SEND_MESSAGE, payload: msg });
    const { _id, avatar, username } = auth.user;
    socket.emit("sendMessage", { ...msg, user: { _id, avatar, username } });
    try {
      await PostAPIData("message", msg, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// get chats
export const getChats = (auth) => async (dispatch) => {
  try {
    const { data } = await GetAPIData("chat", auth.token);
    let chatsArr = [];
    data.chats.forEach((chat) => {
      chat.recipients.forEach((recipient) => {
        if (recipient._id !== auth.user._id) {
          chatsArr.push({
            ...recipient,
            messageText: chat.messageText,
            media: chat.media,
          });
        }
      });
    });
    dispatch({
      type: GET_CHATS,
      payload: { chatsArr, chatsCount: data.chatsCount },
    });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

// Get Messages
export const getMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const { data } = await GetAPIData(
        `messages/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...data, messages: data.messages.reverse() };

      dispatch({
        type: GET_MESSAGES,
        payload: {
          ...newData,
          _id: id,
          page,
        },
      });
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// Loading More Messages
export const loadMoreMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const { data } = await GetAPIData(
        `messages/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...data, messages: data.messages.reverse() };

      dispatch({
        type: LOADE_MORE_MESSAGES,
        payload: {
          ...newData,
          _id: id,
          page,
        },
      });
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// delete Message
export const deleteMessage =
  ({ message, messages, auth }) =>
  async (dispatch) => {
    const messagesAfterDeleteMsg = deleteData(messages, message._id);
    dispatch({
      type: DELETE_MESSAGE,
      payload: { messagesAfterDeleteMsg, _id: message.recipient },
    });

    try {
      await DeleteAPIData(`message/${message._id}`, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

// delete Chat
export const deleteChat =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_CHAT, payload: id });
    try {
      await DeleteAPIData(`chat/${id}`, auth.token);
    } catch (error) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
