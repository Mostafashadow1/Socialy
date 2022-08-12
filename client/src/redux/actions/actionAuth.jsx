import { GLOBALTYPES } from "../actions/constant";
import { PostAPIData } from "../../utils/fetchData";
import { registerValid } from "../../utils/registerValid";
const { RESPONSEMESSAGE, AUTH } = GLOBALTYPES;

export const register = (userDataRegistration) => async (dispatch) => {
  const checkInput = registerValid(userDataRegistration);
  const { error, errorLength } = checkInput;
  if (errorLength > 0) {
    return dispatch({
      type: RESPONSEMESSAGE,
      payload: error,
    });
  }
  try {
    dispatch({ type: RESPONSEMESSAGE, payload: { loading: true } });
    const res = await PostAPIData("register", userDataRegistration);
    const { user, AccessToken } = res.data;
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        user,
        AccessToken,
      },
    });
    localStorage.setItem("login", true);
    dispatch({ type: RESPONSEMESSAGE, payload: { loading: false } });
    window.location.href = "/";
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: msg,
      },
    });
  }
};

// Action Login User
export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: RESPONSEMESSAGE, payload: { loading: true } });
    const { data } = await PostAPIData("login", userData);
    const { AccessToken, user, msg } = data;
    dispatch({
      type: AUTH,
      payload: {
        token: AccessToken,
        user: user,
      },
    });
    localStorage.setItem("login", true);
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        success: msg,
      },
    });
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: msg,
      },
    });
  }
};

// Handle Reload page . set User Login
export const refreshToken = () => async (dispatch) => {
  const login = localStorage.getItem("login");
  if (login) {
    dispatch({ type: RESPONSEMESSAGE, payload: { loading: true } });
    try {
      const { data } = await PostAPIData("refreshtoken");
      const { AccessToken, user } = data;
      dispatch({
        type: AUTH,
        payload: {
          token: AccessToken,
          user: user,
        },
      });

      dispatch({ type: RESPONSEMESSAGE, payload: {} });
    } catch (err) {
      const { msg } = err.response.data;
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error: msg,
        },
      });
    }
  }
};

// logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: RESPONSEMESSAGE, payload: { loading: true } });
    localStorage.removeItem("login");
    await PostAPIData("logout");
    window.location.href = "/";
  } catch (err) {
    const { msg } = err.response.data;
    dispatch({
      type: RESPONSEMESSAGE,
      payload: {
        error: msg,
      },
    });
  }
};
