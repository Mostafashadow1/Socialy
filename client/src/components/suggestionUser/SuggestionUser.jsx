import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Loading, UserCard } from "components/index";
import { useDispatch, useSelector } from "react-redux";
import { authState, stateSuggestion } from "redux/store";
import { handleGetSuggestion } from "redux/actions/actionSuggestion";
function SuggestionUser() {
  // States And Functions
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const suggestionUser = useSelector(stateSuggestion);

  useEffect(() => {
    dispatch(handleGetSuggestion(auth));
  }, [auth, dispatch]);
  return (
    <>
      {suggestionUser && (
        <Box
          sx={{
            padding: "10px",
            marginTop: "12px",
            backgroundColor: "var(--secondColor)",
            borderRadius: "4px",
            border: "1px solid var(--lineColor)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              gap: "10px",
            }}
          >
            <Typography variant="h5" color="#ddd" fontWeight="600">
              Suggestion For You
            </Typography>
            <CelebrationIcon style={{ color: "#ddd" }} />
          </Box>
          <Box marginTop="20px">
            {suggestionUser.loading ? (
              <Loading width="30px" />
            ) : (
              suggestionUser.users.map((user) => (
                <UserCard key={user._id} userData={user} />
              ))
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default SuggestionUser;
