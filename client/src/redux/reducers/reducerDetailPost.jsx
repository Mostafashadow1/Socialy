import { POST_TYPES } from "../actions/constant";
import { editData } from "../../utils/helper";
export const reducerDetailPost = (state = [], action) => {
  const {
    GET_DETAILS_POST,
    UPDATE_POST,
    COMMENT_POST,
    UNLIKED_POST,
    DELETE_COMMENT,
    EDIT_COMMENT,
    LIKE_COMMENT,
    LIKE_POST,
  } = POST_TYPES;
  switch (action.type) {
    case GET_DETAILS_POST:
      return [...state, action.payload];
    case UPDATE_POST:
    case COMMENT_POST:
    case UNLIKED_POST:
    case DELETE_COMMENT:
    case EDIT_COMMENT:
    case LIKE_COMMENT:
    case LIKE_POST:
      return editData(state, action.payload._id, action.payload);
    default:
      return state;
  }
};
