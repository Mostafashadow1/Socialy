let users = [];

export const SocketServer = (socket) => {
  // Connect to Website
  socket.on("connected", (user) => {
    users.push({
      userId: user._id,
      socketId: socket.id,
      followers: user.followers,
    });
  });

  // Disconnect from Website
  socket.on("disconnect", () => {
    const userDisconnected = users.find((user) => user.socketId === socket.id);
    if (userDisconnected) {
      const userFollowers = users.filter((user) =>
        userDisconnected.followers.find((item) => item._id === user.userId)
      );
      if (userFollowers.length > 0) {
        userFollowers.forEach((client) => {
          socket
            .to(`${client.socketId}`)
            .emit("userOffline", userDisconnected.userId);
        });
      }
    }

    users.filter((user) => user.socketId !== socket.id);
  });

  // Follow User
  socket.on("follow", (addFollowAndFollowing) => {
    const user = users.find(
      (user) => user.userId === addFollowAndFollowing._id
    );
    // is Find
    if (user) {
      socket
        .to(`${user.socketId}`)
        .emit("followToClient", addFollowAndFollowing);
    }
  });

  // unFollow User
  socket.on("unFollow", (removeFollowAndFollowing) => {
    const user = users.find(
      (user) => user.userId === removeFollowAndFollowing._id
    );
    // is Find
    if (user) {
      socket
        .to(`${user.socketId}`)
        .emit("unFollowToClient", removeFollowAndFollowing);
    }
  });

  // Create Comment
  socket.on("createComment", (postAfterComment) => {
    const ids = [...postAfterComment.user.followers, postAfterComment.user._id];
    const userAfterComment = users.filter((user) => ids.includes(user.userId));
    // is Find
    if (userAfterComment.length > 0) {
      userAfterComment.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("createCommentToClient", postAfterComment);
      });
    }
  });

  // Delete Comment
  socket.on("deleteComment", (postAfterDelete) => {
    const ids = [...postAfterDelete.user.followers, postAfterDelete.user._id];
    const userAfterDeleteComment = users.filter((user) =>
      ids.includes(user.userId)
    );
    // is Find
    if (userAfterDeleteComment.length > 0) {
      userAfterDeleteComment.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("deleteCommentToClient", postAfterDelete);
      });
    }
  });

  // Like Comment
  socket.on("likeComment", (postAfterLikeComments) => {
    const ids = [
      ...postAfterLikeComments.user.followers,
      postAfterLikeComments.user._id,
    ];
    const userAfterLikeComments = users.filter((user) =>
      ids.includes(user.userId)
    );
    // is Find
    if (userAfterLikeComments.length > 0) {
      userAfterLikeComments.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("likeCommentToClient", postAfterLikeComments);
      });
    }
  });

  // unLike Comment
  socket.on("unLikeComment", (postAfterunLikeComments) => {
    const ids = [
      ...postAfterunLikeComments.user.followers,
      postAfterunLikeComments.user._id,
    ];
    const userAfterUnLikeComments = users.filter((user) =>
      ids.includes(user.userId)
    );
    // is Find
    if (userAfterUnLikeComments.length > 0) {
      userAfterUnLikeComments.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("unLikeCommentToClient", postAfterunLikeComments);
      });
    }
  });

  // Update comment
  socket.on("updateComment", (postAfterEditComments) => {
    const ids = [
      ...postAfterEditComments.user.followers,
      postAfterEditComments.user._id,
    ];
    const userAfterEditComments = users.filter((user) =>
      ids.includes(user.userId)
    );
    // is Find
    if (userAfterEditComments.length > 0) {
      userAfterEditComments.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("updateCommentToClient", postAfterEditComments);
      });
    }
  });

  // Create Noitifcation
  socket.on("createNotification", (notificationMsg) => {
    const userNotifications = users.filter((user) =>
      notificationMsg.recipients.includes(user.userId)
    );
    if (userNotifications.length > 0) {
      userNotifications.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("createNotificationToClient", notificationMsg);
      });
    }
  });

  // Delete Notification
  socket.on("deleteNotification", (notificationMsg) => {
    const userNotifications = users.filter((user) =>
      notificationMsg.recipients.includes(user.userId)
    );
    if (userNotifications.length > 0) {
      userNotifications.forEach((user) => {
        socket
          .to(`${user.socketId}`)
          .emit("deleteNotificationToClient", notificationMsg);
      });
    }
  });

  // Send Message
  socket.on("sendMessage", (msg) => {
    const user = users.find((user) => user.userId === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("sendMessageToClient", msg);
  });

  // Online Offline //
  socket.on("userOnline", (userData) => {
    const followingOnline = users.filter((user) =>
      userData.following.find((item) => item._id === user.userId)
    );
    socket.emit("userFollowingOnline", followingOnline);

    // Followers
    const followersOnline = users.filter((user) =>
      userData.followers.find((item) => item._id === user.userId)
    );

    if (followersOnline.length > 0) {
      followersOnline.forEach((client) => {
        socket
          .to(`${client.socketId}`)
          .emit("userFolloworesOnline", userData._id);
      });
    }
  });
};
