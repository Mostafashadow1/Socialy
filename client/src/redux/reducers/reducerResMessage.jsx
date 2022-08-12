import { GLOBALTYPES } from "../actions/constant";
const { RESPONSEMESSAGE } = GLOBALTYPES;
export const reducerResMessage = (state = {}, action) => {
  switch (action.type) {
    case RESPONSEMESSAGE:
      return action.payload;
    default:
      return state;
  }
};
