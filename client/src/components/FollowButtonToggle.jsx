import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { authState, socketState, userState } from "../redux/store";
import { followUser, unFollowUser } from "../redux/actions/actionProfile";

function FollowButtonToggle({ user }) {
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const socket = useSelector(socketState);
  const users = useSelector(userState);
  const [follow, setFollow] = useState(false);

  // Check user follow this account ? setFollow(true) : setFollow(false);
  useEffect(() => {
    if (
      auth.user.following.find(
        (userFollowing) => userFollowing._id === user._id
      )
    ) {
      setFollow(true);
    }
  }, [auth.user, user._id, user.following]);

  // handle add Follow
  const handleFollow = () => {
    setFollow(true);
    dispatch(followUser({ users: users.users, user, auth, socket }));
  };

  // handel Remove Follow
  const handleUnFollow = () => {
    setFollow(false);
    dispatch(unFollowUser({ users: users.users, user, auth, socket }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flex: { sm: 0.5 },
        marginLeft: 1,
      }}
    >
      {follow ? (
        <Button
          sx={{
            color: "var(--activeColor)",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
          onClick={handleUnFollow}
        >
          UnFollow
        </Button>
      ) : (
        <Button
          variant=""
          sx={{
            color: "var(--activeColor)",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </Box>
  );
}

export default FollowButtonToggle;
