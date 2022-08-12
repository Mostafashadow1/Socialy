import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authState,
  notificationsState,
  onlineState,
  socketState,
} from "./redux/store";
import {
  POST_TYPES,
  GLOBALTYPES,
  NOTIFICATIONS_TYPES,
  CHATS_TYPES,
} from "./redux/actions/constant";
import notificationSound from "./assets/audios/mixkit-software-interface-back-2575.wav";
function SocketClient() {
  const {
    COMMENT_POST,
    DELETE_COMMENT,
    EDIT_COMMENT,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
  } = POST_TYPES;
  const { AUTH, ONLINE, OFFLINE } = GLOBALTYPES;
  const { CREATE_NOTIFICATION, DELETE_NOTIFICATION } = NOTIFICATIONS_TYPES;
  const { SEND_MESSAGE, OPEN_CHAT_USER } = CHATS_TYPES;
  const audioRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const socket = useSelector(socketState);
  const notifications = useSelector(notificationsState);
  const online = useSelector(onlineState);
  // Emmet Connectd to website
  useEffect(() => {
    socket?.emit("connected", auth.user);
  }, [auth.user, socket]);

  // (Listen) Follow User
  useEffect(() => {
    socket.on("followToClient", (addFollowAndFollowing) => {
      dispatch({
        type: AUTH,
        payload: { ...auth, user: addFollowAndFollowing },
      });
    });
    return () => socket.off("followToClient");
  }, [socket, dispatch, AUTH, auth]); // dont Add Auth or auth
  // (Listen) unFollow User
  useEffect(() => {
    socket.on("unFollowToClient", (removeFollowAndFollowing) => {
      dispatch({
        type: AUTH,
        payload: { ...auth, user: removeFollowAndFollowing },
      });
    });
    return () => socket.off("unFollowToClient");
  }, [socket, dispatch, AUTH, auth]); // dont Add Auth or auth

  // (Listen) create Comment
  useEffect(() => {
    socket.on("createCommentToClient", (postAfterComment) => {
      dispatch({ type: COMMENT_POST, payload: postAfterComment });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch, COMMENT_POST]);

  // (Listen) delete Comment
  useEffect(() => {
    socket.on("deleteCommentToClient", (postAfterDelete) => {
      dispatch({ type: DELETE_COMMENT, payload: postAfterDelete });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch, DELETE_COMMENT]);

  // (Listen) Update Comment After Edit
  useEffect(() => {
    socket.on("updateCommentToClient", (postAfterEditComments) => {
      dispatch({ type: EDIT_COMMENT, payload: postAfterEditComments });
    });
    return () => socket.off("updateCommentToClient");
  }, [socket, dispatch, EDIT_COMMENT]);

  // (Listen) Like Comment
  useEffect(() => {
    socket.on("likeCommentToClient", (postAfterLikeComments) => {
      dispatch({ type: LIKE_COMMENT, payload: postAfterLikeComments });
    });
    return () => socket.off("likeCommentToClient");
  }, [socket, dispatch, LIKE_COMMENT]);

  // (Listen) unLike Comment
  useEffect(() => {
    socket.on("unLikeCommentToClient", (postAfterunLikeComments) => {
      dispatch({ type: UNLIKE_COMMENT, payload: postAfterunLikeComments });
    });
    return () => socket.off("unLikeCommentToClient");
  }, [socket, dispatch, UNLIKE_COMMENT]);

  // (Listen) create a  Notification
  useEffect(() => {
    socket.on("createNotificationToClient", (notificationMsg) => {
      dispatch({ type: CREATE_NOTIFICATION, payload: notificationMsg });
      if (notifications.sound) {
        audioRef.current.play();
      }
    });
    return () => socket.off("createNotificationToClient");
  }, [socket, dispatch, CREATE_NOTIFICATION, notifications]);

  // (Listen) delete a  Notification
  useEffect(() => {
    socket.on("deleteNotificationToClient", (notificationMsg) => {
      dispatch({ type: DELETE_NOTIFICATION, payload: notificationMsg });
    });
    return () => socket.off("deleteNotificationToClient");
  }, [socket, dispatch, DELETE_NOTIFICATION]);

  // (listen)  sendMessageToClient

  useEffect(() => {
    socket.on("sendMessageToClient", (msg) => {
      dispatch({ type: SEND_MESSAGE, payload: msg });

      dispatch({
        type: OPEN_CHAT_USER,
        payload: {
          ...msg.user,
          messageText: msg.messageText,
          media: msg.media,
        },
      });
    });
    return () => socket.off("sendMessageToClient");
  }, [OPEN_CHAT_USER, SEND_MESSAGE, dispatch, socket]);

  //[ Check User Online and  Offline]

  // Send user data from server
  useEffect(() => {
    socket.emit("userOnline", auth.user);
  }, [socket, auth.user]);

  // user Online Following
  useEffect(() => {
    socket.on("userFollowingOnline", (followingOnline) => {
      followingOnline.forEach((item) => {
        if (!online.includes(item.userId)) {
          dispatch({ type: ONLINE, payload: item.userId });
        }
      });
    });
    return () => socket.off("userFollowingOnline");
  }, [socket, dispatch, online, ONLINE]);

  // user Online Followers
  useEffect(() => {
    socket.on("userFolloworesOnline", (userId) => {
      if (!online.includes(userId)) {
        dispatch({ type: ONLINE, payload: userId });
      }
    });
    return () => socket.off("userFolloworesOnline");
  }, [socket, dispatch, online, ONLINE]);

  // // offline
  useEffect(() => {
    socket.on("userOffline", (userId) => {
      dispatch({ type: OFFLINE, payload: userId });
    });
    return () => socket.off("userFolloworesOnline");
  }, [socket, dispatch, OFFLINE]);

  return (
    <audio controls ref={audioRef} style={{ display: "none" }}>
      <source src={notificationSound} type="audio/wav" />
    </audio>
  );
}

export default SocketClient;
