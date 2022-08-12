import { GLOBALTYPES, POST_TYPES } from "./constant";
import {
  PatchAPIData,
  PostAPIData,
  DeleteAPIData,
} from "../../utils/fetchData";
import { deleteData, editData } from "../../utils/helper";
import { createNotification, deleteNotification } from "./actionNotifications";
const {
  COMMENT_POST,
  EDIT_COMMENT,
  LIKE_COMMENT,
  DELETE_COMMENT,
  UNLIKE_COMMENT,
} = POST_TYPES;
const { RESPONSEMESSAGE } = GLOBALTYPES;

// Create A  Comment
export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    // Loading Comment
    const comment = { ...post, comments: [...post.comments, newComment] };
    dispatch({ type: COMMENT_POST, payload: comment });
    try {
      const res = await PostAPIData(
        "comment",
        { ...newComment, postId: post._id, userPostId: post.user._id },
        auth.token
      );

      // Add commment
      const addComment = { ...res.data.newComment, user: auth.user };
      const postAfterComment = {
        ...post,
        comments: [...post.comments, addComment],
      };
      dispatch({ type: COMMENT_POST, payload: postAfterComment });
      socket.emit("createComment", postAfterComment);

      // Add Notifications
      const notificationMsg = {
        postId: res.data.newComment._id,
        title: newComment.reply ? "mentiond in comment." : "comment your post.",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],

        url: `/post/${post._id}`,
        content: post.caption,
        image: post.images[0].secure_url,
      };

      dispatch(createNotification({ notificationMsg, auth, socket }));
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: err.response.data.msg },
      });
    }
  };

// Update Comment After Edit .
export const updateComment =
  ({ comment, editComment, post, auth, socket }) =>
  async (dispatch) => {
    // get comment and Edited
    const commentsEdited = await editData(post.comments, comment._id, {
      ...comment,
      comment: editComment,
    });
    // Update post after Edit Comment
    const postAfterEditComments = { ...post, comments: commentsEdited };
    // Update State
    dispatch({
      type: EDIT_COMMENT,
      payload: postAfterEditComments,
    });
    socket.emit("updateComment", postAfterEditComments);
    try {
      await PatchAPIData(
        `comment/${comment._id}`,
        { comment: editComment },
        auth.token
      );
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: err.response.data.msg },
      });
    }
  };

// Like Comment
export const likeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    // get comment wanted like and add in likes
    const likeComment = { ...comment, likes: [...comment.likes, auth.user] };
    // update comment after like comment
    const commentAfterLike = editData(post.comments, comment._id, likeComment);

    // update post after like comment
    const postAfterLikeComments = { ...post, comments: commentAfterLike };
    // update state
    dispatch({
      type: LIKE_COMMENT,
      payload: postAfterLikeComments,
    });
    socket.emit("likeComment", postAfterLikeComments);

    try {
      await PatchAPIData(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: err.response.data.msg },
      });
    }
  };

// un like Comment
export const unLikeComment =
  ({ comment, post, auth, socket }) =>
  async (dispatch) => {
    // get comment wanted to  Un like and remove this from Likes
    const unLikeComment = {
      ...comment,
      likes: deleteData(comment.likes, auth.user._id),
    };
    // update comment after remove this like
    const commentAfterUnLike = editData(
      post.comments,
      comment._id,
      unLikeComment
    );
    // update post after  un like
    const postAfterunLikeComments = { ...post, comments: commentAfterUnLike };

    // add change in state
    dispatch({
      type: UNLIKE_COMMENT,
      payload: postAfterunLikeComments,
    });
    socket.emit("unLikeComment", postAfterunLikeComments);
    try {
      await PatchAPIData(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: err.response.data.msg },
      });
    }
  };

// Delete Comment
export const deleteComment =
  ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    // get Comment Want Deletd And All Reply in this Comment
    const commentWantDeleted = [
      ...post.comments.filter((cm) => cm.reply === comment._id),
      comment,
    ];
    // Get Post After Deleted => commentWantDeleted
    const postAfterDelete = {
      ...post,
      comments: post.comments.filter(
        (cm) =>
          !commentWantDeleted.find(
            (commentDeleted) => cm._id === commentDeleted._id
          )
      ),
    };

    // Update State
    dispatch({ type: DELETE_COMMENT, payload: postAfterDelete });
    socket.emit("deleteComment", postAfterDelete);
    try {
      commentWantDeleted.forEach((item) => {
        DeleteAPIData(`comment/${item._id}`, auth.token);

        // Delete Notifications
        const notificationMsg = {
          postId: item._id,
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(deleteNotification({ notificationMsg, auth, socket }));
      });
    } catch (err) {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: err.response.data.msg },
      });
    }
  };
