import { deleteData, editData } from "../../utils/helper";
import { CHATS_TYPES } from "../actions/constant";
const {
  OPEN_CHAT_USER,
  SEND_MESSAGE,
  GET_CHATS,
  GET_MESSAGES,
  LOADE_MORE_MESSAGES,
  DELETE_MESSAGE,
  DELETE_CHAT,
  CHECK_ONLINE_OFFLINE,
} = CHATS_TYPES;
const intialState = {
  chatsUsers: [],
  chatsCount: 0,
  data: [],
  firstLoading: false,
};

export const reducerChats = (state = intialState, action) => {
  switch (action.type) {
    case OPEN_CHAT_USER:
      if (state.chatsUsers.every((chat) => chat._id !== action.payload._id)) {
        return {
          ...state,
          chatsUsers: [action.payload, ...state.chatsUsers],
        };
      }
      return state;
    case SEND_MESSAGE:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.recipient ||
          item._id === action.payload.sender
            ? {
                ...item,
                messages: [...item.messages, action.payload],
                messagesCount: item.messagesCount + 1,
              }
            : item
        ),
        chatsUsers: state.chatsUsers.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                messageText: action.payload.messageText,
                media: action.payload.media,
              }
            : user
        ),
      };
    case GET_CHATS:
      return {
        ...state,
        chatsUsers: action.payload.chatsArr,
        chatsCount: action.payload.chatsCount,
        firstLoading: true,
      };
    case GET_MESSAGES:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case LOADE_MORE_MESSAGES:
      return {
        ...state,
        data: editData(state.data, action.payload._id, action.payload),
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        data: state.data.map((dataMessages) =>
          dataMessages._id !== action.payload_id
            ? {
                ...dataMessages,
                messages: action.payload.messagesAfterDeleteMsg,
              }
            : dataMessages
        ),
      };

    case DELETE_CHAT:
      return {
        ...state,
        chatsUsers: deleteData(state.chatsUsers, action.payload),
        data: deleteData(state.data, action.payload),
      };

    case CHECK_ONLINE_OFFLINE:
      return {
        ...state,
        chatsUsers: state.chatsUsers.map((user) =>
          action.payload.includes(user._id)
            ? { ...user, online: true }
            : { ...user, online: false }
        ),
      };
    default:
      return state;
  }
};
