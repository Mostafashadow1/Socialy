import { PROFILE_TYPES } from "../actions/constant";
import { editData } from "../../utils/helper";
const {
  LOADING,
  GET_USER,
  FOLLOW,
  UNFOLLOW,
  GET_ID,
  GET_POSTS_PROFILE,
  GET_MORE_POST,
} = PROFILE_TYPES;

const intialState = {
  loading: false,
  users: [],
  _id: [],
  posts: [],
  page: 2,
  postsCount: 0,
};

export const reducerProfile = (state = intialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        _id: [...state._id, action.payload],
      };
    case GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case GET_POSTS_PROFILE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        postsCount: action.payload.postsCount,
      };

    case GET_MORE_POST:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      };

    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    default:
      return state;
  }
};
