import { SUGGESTION_USER_TYPES } from "../actions/constant";

const { LOADING_SUGGESTION, GET_USER_SUGGESTION } = SUGGESTION_USER_TYPES;
const intialState = {
  loading: false,
  users: [],
  usersCount: 0,
};
export const reducerSuggestion = (state = intialState, action) => {
  switch (action.type) {
    case LOADING_SUGGESTION:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_USER_SUGGESTION:
      return {
        ...state,
        users: action.payload.users,
        usersCount: action.payload.usersCount,
      };
    default:
      return state;
  }
};
