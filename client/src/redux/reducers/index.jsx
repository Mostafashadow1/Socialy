import { combineReducers } from "redux";
import { reducerAuth } from "./reducerAuth";
import { reducerResMessage } from "./reducerResMessage";
import { reducerProfile } from "./reducerProfile";
import { reducerModelPost } from "./reducerModelPost";
import { reducerPosts } from "./reducerPosts";
import { reducerDetailPost } from "./reducerDetailPost";
import { reducerExplore } from "./reducerExplore";
import { reducerSuggestion } from "./reducerSuggestion";
import { reducerSocket } from "./reducerSocket";
import { reducerNotifications } from "./reducerNotifications";
import { reducerChats } from "./reducerChats";
import { onlineReducer } from "./onlineReducer";
export default combineReducers({
  reducerResMessage,
  reducerAuth,
  reducerProfile,
  reducerModelPost,
  reducerPosts,
  reducerDetailPost,
  reducerExplore,
  reducerSuggestion,
  reducerSocket,
  reducerNotifications,
  reducerChats,
  onlineReducer,
});
