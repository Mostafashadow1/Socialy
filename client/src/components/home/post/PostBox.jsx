import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AvatarUser } from "utils/helper";
import { ScrollHook } from "hooks/ScrollHook";
import { authState } from "redux/store";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "redux/actions/constant";
function PostBox() {
  const { MODEL_POST } = GLOBALTYPES;
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const { hiddenScroll } = ScrollHook();

  const handleOpenPostModel = () => {
    hiddenScroll();
    dispatch({ type: MODEL_POST, payload: true });
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        margin: "10px 0px",
        paddingRight: "5px",
        backgroundColor: "var(--secondColor)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px 6px",
          gap: 1,
        }}
      >
        <Box>
          <Link to={`/profile/${auth?.user?._id}`}>
            {AvatarUser(auth?.user?.avatar, auth?.user?.username, {
              width: 50,
              height: 50,
            })}
          </Link>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Button
            onClick={handleOpenPostModel}
            sx={{
              width: "100%",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "18px",
              justifyContent: "start",
              color: "#fff !important",
              textTransform: "capitalize",
              background: "var(--bgColor)",
            }}
          >
            What are you thinking?
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PostBox;
