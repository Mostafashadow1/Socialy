import { POST_TYPES } from "../actions/constant";
import { editData, deleteData } from "../../utils/helper";
const {
  CREATE_POST,
  GET_POSTS,
  LOADING_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKED_POST,
  COMMENT_POST,
  EDIT_COMMENT,
  LIKE_COMMENT,
  DELETE_COMMENT,
  GET_MORE_POST,
  UNLIKE_COMMENT,
} = POST_TYPES;

// Intial
const intialState = {
  loading: false,
  posts: [],
  page: 2,
};

export const reducerPosts = (state = intialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_POSTS:
    case GET_MORE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        page: action.payload.page,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: deleteData(state.posts, action.payload),
      };
    case UPDATE_POST:
    case LIKE_POST:
    case UNLIKED_POST:
    case COMMENT_POST:
    case EDIT_COMMENT:
    case LIKE_COMMENT:
    case UNLIKE_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      };

    default:
      return state;
  }
};
