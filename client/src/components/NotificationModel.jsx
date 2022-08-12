import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import { Loading } from "components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  closeNotificationSound,
  deleteAllNotifications,
  isReadNotification,
  openNotificationSound,
} from "../redux/actions/actionNotifications";
import { authState, notificationsState } from "../redux/store";
import { AvatarUser } from "../utils/helper";
function NotificationModel({ notifications }) {
  // States And Functions
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const notification = useSelector(notificationsState);
  const handleFocusInCard = (e) => {
    e.stopPropagation();
  };
  // handle Read Notification
  const handleReadNotification = (notificationMsg) => {
    dispatch(isReadNotification({ notificationMsg, auth }));
  };
  // handle open Sound Notification
  const handleOpenSound = () => {
    dispatch(openNotificationSound());
  };
  // handle Close Sound Notification
  const handleCloseSound = () => {
    dispatch(closeNotificationSound());
  };
  // handle Delete All Notifications
  const handleDeleteAllNotifications = () => {
    dispatch(deleteAllNotifications(auth));
  };

  return (
    <Box
      onClick={handleFocusInCard}
      sx={{
        position: "absolute",
        backgroundColor: "var(--secondColor)",
        border: "1px solid var(--lineColor)",
        height: { xs: "300px", md: "500px" },
        borderRadius: "6px",
        zIndex: "1000",
        right: "50%",
        transform: "translateX(20%)",
        width: { xs: "80vw", sm: "370px", md: "400px" },
        top: { xs: "auto", sm: "50px" },
        bottom: { xs: 53, sm: "auto" },
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--lineColor)",
          padding: "0px 10px",
        }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <Typography variant="h6" fontSize="20px">
            Notifications
          </Typography>
          <Box>
            {notifications.sound ? (
              <IconButton onClick={handleCloseSound}>
                <NotificationsOffOutlinedIcon
                  style={{ fontSize: "26px", color: "var(--iconColor)" }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenSound}>
                <NotificationsActiveOutlinedIcon
                  style={{ fontSize: "26px", color: "var(--iconColor)" }}
                />
              </IconButton>
            )}
          </Box>
        </Box>

        {notification.data.length > 0 && (
          <Box>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={handleDeleteAllNotifications}
            >
              Delete All
            </Button>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: "calc(100% - 60px)",
        }}
      >
        {notifications.loading ? (
          <Loading width="30px" />
        ) : (
          <>
            {notifications?.data?.length === 0 ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <NotificationImportantIcon
                  style={{ fontSize: "100px", color: "#ccc" }}
                />
              </Box>
            ) : (
              notifications?.data.map((msgData, idx) => (
                <Link
                  to={`${msgData.url}`}
                  key={idx}
                  onClick={() => handleReadNotification(msgData)}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 5px",
                      transition: "200ms ease",
                      borderBottom: "1px solid var(--lineColor)",
                      ":hover": {
                        backgroundColor: "var(--bgColor)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {AvatarUser(msgData.user.avatar, msgData.user.username, {
                        width: 35,
                        height: 35,
                      })}
                      <Box>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="9px"
                          flexWrap="wrap"
                        >
                          <Typography
                            variant="h6"
                            fontSize="16px"
                            fontWeight="400"
                          >
                            {msgData?.user?.username}
                          </Typography>
                          <Typography variant="h6" fontSize="16px">
                            {msgData?.title}
                          </Typography>
                        </Box>
                        <Typography variant="caption">
                          {msgData.createdAt &&
                            moment(msgData.createdAt).fromNow()}
                        </Typography>
                        {!msgData.isRead && (
                          <Stack
                            height="10px"
                            width="10px"
                            backgroundColor="#2196f3b0"
                            borderRadius="50%"
                            display="inline-block"
                            marginLeft="10px"
                          />
                        )}
                      </Box>
                    </Box>
                    {msgData.image && (
                      <Box>
                        <img
                          style={{
                            display: "block",
                            width: "35px",
                            height: "35px",
                            objectFit: "contain",
                          }}
                          src={msgData?.image}
                          alt="image_post"
                        />
                      </Box>
                    )}
                  </Box>
                </Link>
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default NotificationModel;
