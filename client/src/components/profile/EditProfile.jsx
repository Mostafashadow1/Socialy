import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authState } from "../../redux/store";
import { GLOBALTYPES } from "../../redux/actions/constant";
import { updateProfile } from "../../redux/actions/actionProfile";

import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { checkAvatar } from "../../utils/checkAvatar";
import { CoverModal, CropEasy } from "components/index";
function EditProfile({ setIsEdit }) {
  // Start Styles
  const InputFile = styled("input")({
    display: "none",
  });

  const AppAvatar = styled("div")({
    position: "relative",
    zIndex: 3333333,
    width: "fit-content",
  });
  const ChangeAvatar = styled("div")({
    position: "absolute",
    bottom: "-7px",
    right: "-15px",
    width: "fit-content",
    height: "fit-content",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    cursor: "pointer",
    margin: "0px auto",
    transition: "all 100ms ease-in-out",
  });

  // state and Functions
  const auth = useSelector(authState);
  const dispatch = useDispatch();
  const { RESPONSEMESSAGE } = GLOBALTYPES;
  const [editUserData, setEditUserData] = useState({
    fullname: "",
    number: "",
    website: "",
    bio: "",
    gender: "",
    address: "",
  });
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [isClickSave, setIsClickSave] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  // set edit user data
  useEffect(() => {
    setEditUserData(auth.user);
  }, [auth.user]);
  const handeleFocusInEditCard = (e) => {
    e.stopPropagation();
  };

  // Handle Change Input
  const handleChange = (prop) => (event) => {
    setEditUserData({ ...editUserData, [prop]: event.target.value });
    setIsClickSave(false);
  };
  // Close Alert
  const handleCloseAlert = () => {
    dispatch({ type: RESPONSEMESSAGE, payload: {} });
  };
  // Handle Change avatar
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    const error = checkAvatar(file);
    setIsClickSave(false);

    if (!error) {
      setFile(file);
      setAvatar(URL.createObjectURL(file));
      setOpenCrop(true);
      handleCloseAlert();
    } else {
      dispatch({
        type: RESPONSEMESSAGE,
        payload: {
          error,
        },
      });
    }
  };

  // Handle Supmit Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ avatar, file, editUserData, auth, setIsEdit }));
    setIsClickSave(true);
  };

  return (
    <>
      {!openCrop ? (
        <Box onClick={() => setIsEdit(false)}>
          <CoverModal>
            <Box
              onClick={handeleFocusInEditCard}
              sx={{
                backgroundColor: "var(--secondColor)",
                width: { xs: "95vw", sm: "94vw", md: "400px", lg: "600px" },
                padding: "10px",
                overflowY: "auto",
                height: { xs: "500px", md: "fit-content" },
                borderRadius: "2px",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{ margin: "2px auto" }}
                autoComplete="off"
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginBottom: "20px" }}
                >
                  <AppAvatar>
                    <Avatar
                      src={avatar ? avatar : auth.user.avatar}
                      sx={{
                        width: "100px",
                        height: "100px",
                        background: "var(--activeColor)",
                      }}
                    />

                    <ChangeAvatar>
                      <label
                        htmlFor="icon-button-file"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        <InputFile
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          onChange={handleChangeAvatar}
                        />
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                          sx={{ margin: "0px auto" }}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </ChangeAvatar>
                  </AppAvatar>
                </Stack>
                <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
                  <TextField
                    id="Fullname"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    value={editUserData.fullname}
                    onChange={handleChange("fullname")}
                    sx={{
                      label: {
                        color: "#fff",
                        fontSize: "19px",
                      },
                      input: {
                        color: "#fff",
                        border: "1px solid var(--lineColor)",
                        borderRadius: "5px",
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "tomato",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                    }}
                  >
                    {editUserData?.fullname.length} /22
                  </Typography>
                </FormControl>
                <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
                  <TextField
                    id="number"
                    label="Phone Number"
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    value={editUserData.number}
                    onChange={handleChange("number")}
                    sx={{
                      label: {
                        color: "#fff",
                        fontSize: "18px",
                      },
                      input: {
                        color: "#fff",
                        border: "1px solid var(--lineColor)",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{ mt: 1, width: "100%" }}
                  variant="outlined"
                  autoComplete="off"
                >
                  <TextField
                    id="Address"
                    label="Address"
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    value={editUserData.address}
                    onChange={handleChange("address")}
                    sx={{
                      label: {
                        color: "#fff",
                        fontSize: "18px",
                      },
                      input: {
                        color: "#fff",
                        border: "1px solid var(--lineColor)",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{ mt: 1, width: "100%" }}
                  variant="outlined"
                  autoComplete="off"
                >
                  <TextField
                    id="Website"
                    label="Website"
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    value={editUserData.website}
                    onChange={handleChange("website")}
                    sx={{
                      label: {
                        color: "#fff",
                        fontSize: "18px",
                      },
                      input: {
                        color: "#fff",
                        border: "1px solid var(--lineColor)",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
                  <TextField
                    label="Bio"
                    multiline
                    rows={4}
                    value={editUserData.bio}
                    onChange={handleChange("bio")}
                    sx={{
                      label: {
                        color: "#fff",
                        fontSize: "18px",
                      },
                      div: {
                        border: "1px solid var(--lineColor)",
                      },
                      textarea: {
                        color: "#fff",
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "tomato",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      textAlign: "right",
                      paddingRight: "5px",
                    }}
                  >
                    {editUserData.bio.length} /150
                  </Typography>
                </FormControl>

                <FormControl sx={{ width: "100%" }}>
                  <Button
                    disabled={isClickSave && true}
                    type="submit"
                    sx={{
                      color: "#fff ",
                      margin: "10px 0px",
                      padding: "10px",
                      backgroundColor: "var(--activeColor)",
                      fontWeight: "bold",
                    }}
                  >
                    {isClickSave ? "Loading..." : "Save"}
                  </Button>
                </FormControl>
              </form>
            </Box>
          </CoverModal>
        </Box>
      ) : (
        <Box
          onClick={() => setIsEdit(false)}
          sx={{
            backgroundColor: "#57575794",
            position: "fixed",
            width: "100vw",
            inset: 0,
            zIndex: 99999,
          }}
        >
          <CropEasy {...{ avatar, setOpenCrop, setAvatar, setFile }} />
        </Box>
      )}
    </>
  );
}
export default EditProfile;
