import { GLOBALTYPES } from "../actions/constant";
const { DARKMOOD } = GLOBALTYPES;
export const reducerDark = (state = {}, action) => {
  switch (action.type) {
    case DARKMOOD:
      return action.payload;
    default:
      return state;
  }
};
