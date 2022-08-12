import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import mainReducer from "./reducers/index";

export const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const authState = (state) => state.reducerAuth;
export const resMessagesState = (state) => state.reducerResMessage;
export const userState = (state) => state.reducerProfile;
export const openModelPost = (state) => state.reducerModelPost;
export const reducerPosts = (state) => state.reducerPosts;
export const reducerDetailPost = (state) => state.reducerDetailPost;
export const stateExplore = (state) => state.reducerExplore;
export const stateSuggestion = (state) => state.reducerSuggestion;
export const socketState = (state) => state.reducerSocket;
export const notificationsState = (state) => state.reducerNotifications;
export const chatsState = (state) => state.reducerChats;
export const onlineState = (state) => state.onlineReducer;
