import { EXPLORE_TYPES } from "../actions/constant";
const { LOADING_EXPLORE, EXPLORE_POSTS, GET_MORE_POST } = EXPLORE_TYPES;

const intialState = {
  firstLoading: false, // Cashing
  loading: false,
  posts: [],
  postsCount: 0,
  page: 2,
};

export const reducerExplore = (state = intialState, action) => {
  switch (action.type) {
    case LOADING_EXPLORE:
      return { ...state, loading: action.payload };
    case EXPLORE_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        firstLoading: true,
      };

    case GET_MORE_POST:
      return {
        ...state,
        posts: action.payload.posts,
        postsCount: action.payload.postsCount,
        firstLoading: true,
        page: state.page + 1,
      };
    default:
      return state;
  }
};
