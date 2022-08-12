import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert} from "@mui/material";
import { GLOBALTYPES } from "../../redux/actions/constant";
import { resMessagesState } from "../../redux/store";
export default function ErrorMessage() {
  const dispatch = useDispatch();
  const responseMessage = useSelector(resMessagesState);
  const { RESPONSEMESSAGE } = GLOBALTYPES;

  // Close Alert
  const handleCloseAlert = () => {
    dispatch({ type: RESPONSEMESSAGE, payload: {} });
  };
  return (
    <Alert
      severity="error"
      onClose={handleCloseAlert}
      sx={{
        position: "absolute",
        right: "5vw",
        top: "10vh",
        zIndex: 9999999,
      }}
    >
      <strong>{responseMessage?.error}</strong>
    </Alert>
  );
}

