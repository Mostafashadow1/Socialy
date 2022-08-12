import { GLOBALTYPES } from "../actions/constant";
const { SOCKET } = GLOBALTYPES;
export const reducerSocket = (state = null, action) => {
  switch (action.type) {
    case SOCKET:
      return action.payload;
    default:
      return state;
  }
};
