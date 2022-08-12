import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { GetAPIData } from "utils/fetchData";

// @mui
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
// redux
import { useSelector, useDispatch } from "react-redux";
import { authState, chatsState, onlineState } from "redux/store";
import { getChats, openChatUser } from "redux/actions/actionChats";
import { CHATS_TYPES } from "redux/actions/constant";
// components
import { UserChat, Loading } from "components/index";
import { DebounceHook } from "hooks/DebounceHook";
function ChatsMenue() {
  // States And Functions
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const chats = useSelector(chatsState);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);
  const { id } = useParams();
  const { CHECK_ONLINE_OFFLINE } = CHATS_TYPES;
  const online = useSelector(onlineState);
  const searchRef = useRef(null);
  // handle search user
  const handleSearchUser = async (e) => {
    const { value } = e.target;
    if (!value) {
      setUsers([]);
      setNoUserFound(false);
      return;
    }
    setLoading(true);
    const { data } = await GetAPIData(
      `search?username=${value?.toLowerCase()}`,
      auth.token
    );
    if (data.users.length === 0) {
      setUsers([]);
      setNoUserFound(true);
    } else {
      setNoUserFound(false);
      setUsers(data.users);
    }
    setLoading(false);
  };
  // debounce search
  const { debounceSearch } = DebounceHook(handleSearchUser, 700);

  // Handle Get Chats
  useEffect(() => {
    if (chats.firstLoading) return;
    dispatch(getChats(auth));
  }, [auth, chats.firstLoading, dispatch]);

  // Check online user and added
  useEffect(() => {
    if (chats.firstLoading) {
      dispatch({ type: CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [CHECK_ONLINE_OFFLINE, chats.firstLoading, dispatch, online]);

  // Handle Open Caht User
  const handleOpenChat = (user) => {
    searchRef.current.value = "";
    setUsers([]);
    dispatch(openChatUser({ user, chats }));
    dispatch({ type: CHECK_ONLINE_OFFLINE, payload: online });

    navigate(`/chats/${user._id}`);
  };

  return (
    <>
      <Box sx={{ borderRight: "1px solid var(--lineColor)", height: "100%" }}>
        <Box
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid var(--lineColor)",
            padding: "10px",
            gap: 1,
          }}
        >
          <Typography variant="h5">{auth?.user?.username}</Typography>
        </Box>

        <form>
          <Box
            sx={{
              height: "60px",
              borderBottom: "1px solid var(--lineColor)",
              padding: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              display: "flex",
            }}
          >
            <input
              style={{
                border: "none",
                outlineWidth: 0,
                backgroundColor: "inherit",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "100",
                flex: "1",
                ":hover": {
                  border: "none",
                },
              }}
              type="text"
              placeholder="Enter to Search ..."
              ref={searchRef}
              onChange={debounceSearch}
            />
            {loading ? <Loading width="24px" /> : <SearchIcon />}
          </Box>
        </form>

        <Box>
          {noUserFound && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              height="400px"
            >
              <SentimentSatisfiedIcon
                style={{ fontSize: "40px", color: "var(--iconColor)" }}
              />
              <Typography
                variant="h5"
                color="var(--iconColor)"
                marginTop="10px"
              >
                user not found.
              </Typography>
            </Box>
          )}

          {users.length === 0 ? (
            <>
              {!noUserFound &&
                chats.chatsUsers.map((user) => (
                  <Box key={user._id} onClick={() => handleOpenChat(user)}>
                    <UserChat
                      user={user}
                      hover
                      userMenue
                      active={id === user._id}
                      userOnline={user.online}
                    />
                  </Box>
                ))}
            </>
          ) : (
            <Box height="calc(100vh - 230px)" sx={{ overflowY: "auto" }}>
              {users.map((user) => (
                <Box key={user._id} onClick={() => handleOpenChat(user)}>
                  <UserChat user={user} />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ChatsMenue;
