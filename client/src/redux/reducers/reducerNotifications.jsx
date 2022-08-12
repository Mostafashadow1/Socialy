import { editData } from "../../utils/helper";
import { NOTIFICATIONS_TYPES } from "../actions/constant";
const {
  LOADING_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  SOUND,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  IS_READ,
  DELETE_ALL_NOTIFICATION,
} = NOTIFICATIONS_TYPES;
const intialState = {
  loading: false,
  data: [],
  sound: true,
};
export const reducerNotifications = (state = intialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload.notfication,
      };
    case LOADING_NOTIFICATIONS:
      return {
        ...state,
        loading: action.payload,
      };

    case CREATE_NOTIFICATION:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };

    case IS_READ:
      return {
        ...state,
        data: editData(state.data, action.payload._id, action.payload),
      };
    case SOUND:
      return {
        ...state,
        sound: action.payload,
      };

    case DELETE_ALL_NOTIFICATION:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
