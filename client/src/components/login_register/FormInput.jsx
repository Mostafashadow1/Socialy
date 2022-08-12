import React from "react";
import { Typography, TextField, FormControl } from "@mui/material";
function FormInput({ messageError, ...props }) {
  const styledError = {
    color: "#da5252",
    fontSize: "16px",
    whiteSpace: "nowrap",
  };
  return (
    <>
      <FormControl sx={{ my: 2, width: "100%" }}>
        <TextField
          required
          {...props}
          color="secondary"
          sx={{
            border: "1px solid var(--lineColor)",
            borderRadius: "6px",
            input: {
              color: "#fff",
            },
            label: {
              color: "#fff",
              fontSize: "20px",
            },
          }}
        />
        <Typography style={styledError} variant="h6">
          {messageError}
        </Typography>
      </FormControl>
    </>
  );
}

export default FormInput;
