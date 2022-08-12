import { GLOBALTYPES } from "../actions/constant";
const { MODEL_POST } = GLOBALTYPES;
export const reducerModelPost = (state = false, action) => {
  switch (action.type) {
    case MODEL_POST:
      return action.payload;
    default:
      return state;
  }
};
