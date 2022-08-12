import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataSearch, NotificationModel, LogicHeader } from "components/index";
import { AvatarUser } from "utils/helper";
// @mui
import {
  MenuItem,
  Menu,
  Container,
  Tooltip,
  Box,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
//icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatOut from "@heroicons/react/outline/ChatIcon";
import ChatSolid from "@heroicons/react/solid/ChatIcon";
import HomeOut from "@heroicons/react/outline/HomeIcon";
import HomeSolid from "@heroicons/react/solid/HomeIcon";
import HeartOut from "@heroicons/react/outline/HeartIcon";
import HeartSolid from "@heroicons/react/solid/HeartIcon";
import ExploreIcon from "@mui/icons-material/Explore";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

import LoadingIcon from "assets/images/loading.gif";
import {
  styledParentHeader,
  styledIconWrapper,
  styledSearch,
  styledInput,
  styledAppBar,
  styledSearchData,
} from "./Style_header";
// redux
import { getNotification } from "redux/actions/actionNotifications";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "redux/store";
export default function HeaderComp() {
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  // Get NotificationModel
  useEffect(() => {
    if (auth.token) {
      dispatch(getNotification(auth.token));
    }
  }, [dispatch, auth.token]);

  const {
    handleOpenUserMenu,
    handleCloseUserMenu,
    loading,

    searchTerm,
    users,
    handleCloseSearch,
    anchorElUser,
    handleLogout,
    location,
    notifications,
    setIsNotifications,
    isNotifications,
    debounceSearch,
  } = LogicHeader();

  return (
    <Box style={styledParentHeader} onClick={handleCloseUserMenu}>
      <Container>
        <Box
          position="sticky"
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            style={styledAppBar}
            sx={{
              justifyContent: { xs: "space-around ", sm: "space-between" },
            }}
          >
            <Link to="/">
              <Box>
                <Typography
                  className="logo_text"
                  variant="h4"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Soicaly
                </Typography>
              </Box>
            </Link>
            <Box style={styledSearch} sx={{ flex: { xs: 1, md: 0.5 } }}>
              <Box style={styledIconWrapper}>
                {loading ? (
                  <img
                    src={LoadingIcon}
                    alt="icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  <SearchIcon />
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <input
                  style={styledInput}
                  type="search"
                  autoComplete="off"
                  placeholder="Find any user"
                  onChange={debounceSearch}
                  ref={searchTerm}
                />
              </Box>

              {searchTerm?.current?.value && (
                <Box
                  style={styledSearchData}
                  sx={{
                    width: "100%",
                    left: "0px",
                  }}
                >
                  {users.length > 0 ? (
                    users.map((user, idx) => (
                      <Link
                        to={`/profile/${user._id}`}
                        key={user._id}
                        onClick={handleCloseSearch}
                      >
                        <DataSearch user={user} />
                      </Link>
                    ))
                  ) : (
                    <Box
                      sx={{ height: "300px" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="1px solid var(--lineColor)"
                    >
                      <Box>
                        <Typography variant="h6" fontSize="16px">
                          No results found.
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: { xs: "var(--secondColor)", sm: "inherit" },
                display: { xs: "flex", sm: "initial" },
                position: { xs: "fixed", sm: "initial" },
                bottom: "0px",
                width: { xs: "100%", sm: "initial" },
                justifyContent: { xs: "center", sm: "initial" },
                padding: { xs: "5px", sm: "initial" },
                borderTop: { xs: "1px solid var(--lineColor)", sm: "initial" },
                zIndex: 9999,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "inherit",
                  justifyContent: "space-around",
                }}
              >
                <Link to="/">
                  <Tooltip title="Home" arrow>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      {location === "/" ? (
                        <HomeSolid width="1.5rem" color="var(--iconColor)" />
                      ) : (
                        <HomeOut width="1.5rem" color="var(--iconColor)" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link to="/chats">
                  <Tooltip title="Chats" arrow>
                    <IconButton
                      size="large"
                      // aria-label="show 4 new notifications"
                      color="inherit"
                    >
                      {location === "/chats" ? (
                        <ChatSolid width="1.5rem" color="var(--iconColor)" />
                      ) : (
                        <ChatOut width="1.5rem" color="var(--iconColor)" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link to="/explore">
                  <Tooltip title="friends of friends" arrow>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      {location === "/explore" ? (
                        <ExploreIcon color="var(--iconColor)" />
                      ) : (
                        <ExploreOutlinedIcon color="var(--iconColor)" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Link>

                <Box
                  position="relative"
                  onClick={() => setIsNotifications(!isNotifications)}
                >
                  {isNotifications && (
                    <NotificationModel notifications={notifications} />
                  )}

                  <Tooltip
                    title="notifications"
                    arrow
                    sx={{
                      mx: { xs: "5px", sm: "intial" },
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="show 2 new notifications"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={notifications.data.length}
                        color="error"
                      >
                        {isNotifications ? (
                          <HeartSolid width="1.5rem" color="var(--iconColor)" />
                        ) : (
                          <HeartOut width="1.5rem" color="var(--iconColor)" />
                        )}
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    marginTop: "5px",
                    position: "relative",
                  }}
                >
                  <Tooltip title="Profile Menue">
                    <IconButton
                      onClick={
                        !anchorElUser ? handleOpenUserMenu : handleCloseUserMenu
                      }
                      sx={{ p: 0 }}
                    >
                      {AvatarUser(auth.user?.avatar, auth.user.username, {
                        width: 35,
                        height: 35,
                      })}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      position: "absolute",
                      top: { xs: "-50px", sm: "15px" },
                      left: "-50px",
                      ul: {
                        background: "var(--secondColor)",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to={`/profile/${auth?.user?._id}`}>
                      <MenuItem
                        sx={{
                          borderBottom: "1px solid var(--lineColor)",
                          transition: "all 200ms ease",
                          "&:hover": {
                            backgroundColor: "#000",
                          },
                        }}
                      >
                        <AccountCircleIcon
                          sx={{
                            marginRight: "5px",
                            fontSize: "20px",
                            color: "var(--iconColor)",
                          }}
                        />
                        <Typography sx={{ color: "#fff" }}>Profile</Typography>
                      </MenuItem>
                    </Link>

                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#000",
                        },
                      }}
                    >
                      <LogoutIcon
                        sx={{
                          marginRight: "5px",
                          fontSize: "20px",
                          color: "var(--iconColor)",
                        }}
                      />

                      <Typography sx={{ color: "#fff" }}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
