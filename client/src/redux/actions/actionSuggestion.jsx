import { SUGGESTION_USER_TYPES, GLOBALTYPES } from "./constant";
import { GetAPIData } from "../../utils/fetchData";
const { LOADING_SUGGESTION, GET_USER_SUGGESTION } = SUGGESTION_USER_TYPES;
const { RESPONSEMESSAGE } = GLOBALTYPES;
export const handleGetSuggestion = (auth) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_SUGGESTION, payload: true });
    const { data } = await GetAPIData(`suggestionUser`, auth.token);
    dispatch({ type: GET_USER_SUGGESTION, payload: data });
    dispatch({ type: LOADING_SUGGESTION, payload: false });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: error.message,
      },
    });
  }
};
