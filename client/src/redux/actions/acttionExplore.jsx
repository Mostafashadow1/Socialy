import { GLOBALTYPES, EXPLORE_TYPES } from "./constant";
import { GetAPIData } from "../../utils/fetchData";

// Get Posts In Explore Page
export const getExplorePosts = (token) => async (dispatch) => {
  const { RESPONSEMESSAGE } = GLOBALTYPES;
  const { LOADING_EXPLORE, EXPLORE_POSTS } = EXPLORE_TYPES;
  try {
    dispatch({ type: LOADING_EXPLORE, payload: true });
    const { data } = await GetAPIData(`posts_explore`, token);
    dispatch({ type: EXPLORE_POSTS, payload: data });
    dispatch({ type: LOADING_EXPLORE, payload: false });
  } catch (error) {
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: error.message,
      },
    });
  }
};
