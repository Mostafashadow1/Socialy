import { GLOBALTYPES } from "../actions/constant";
const { AUTH } = GLOBALTYPES;

// const intialState = {

// }
export const reducerAuth = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};
