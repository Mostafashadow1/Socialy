import React, { useEffect, useRef, useState, createRef } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { CoverModal } from "components/index";
import { showImage, showVideo } from "utils/media";
import { AvatarUser } from "utils/helper";
import { checkMedia } from "utils/checkMedia";
import { ScrollHook } from "hooks/ScrollHook";
// redux
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "redux/actions/constant";
import {
  authState,
  openModelPost,
  reducerPosts,
  socketState,
} from "redux/store";
import { createPost, updatePost } from "redux/actions/actionPost";
// @mui
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import PublicIcon from "@mui/icons-material/Public";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  FormControl,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";

function PostModal() {
  // States and Functions
  const { MODEL_POST, RESPONSEMESSAGE } = GLOBALTYPES;
  const dispatch = useDispatch();
  const fileRef = useRef();
  const textareaRef = createRef();

  const auth = useSelector(authState);
  const postModelState = useSelector(openModelPost);
  const socket = useSelector(socketState);
  const { posts } = useSelector(reducerPosts);
  const [showEmoji, setShowEmoji] = useState(false);
  const [images, setImages] = useState([]);
  const [cursorPostion, setCursorPostion] = useState(null);
  const [post, setPost] = useState(false);
  const [isClickSave, setIsClickSave] = useState(false);
  const [caption, setCaption] = useState();
  const { showScroll } = ScrollHook();
  // set input disabled or not
  useEffect(() => {
    if (images.length > 0) {
      setPost(true);
    } else {
      setPost(false);
    }
  }, [images]);

  // handle show post content and images in edit post
  useEffect(() => {
    if (postModelState.isEdit) {
      setCaption(postModelState.caption);
      setImages(postModelState.images);
    }
  }, [postModelState, setCaption]);

  useEffect(() => {
    textareaRef.current.selectionEnd = cursorPostion;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPostion]); // Don't add  textareaRef => render

  // handel open InputFile
  const handelOpenInputFile = () => {
    fileRef.current.click();
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
    textareaRef.current.focus();
  };

  // handel add show in textarea => (focus curssor )
  const handleAddEmoji = (e) => {
    const ref = textareaRef.current;
    ref.focus();
    const emoji = e.native;
    const start = caption?.substring(0, ref.selectionStart);
    const end = caption?.substring(ref.selectionStart);
    const captionText = start + emoji + end;
    setCaption(captionText);
    textareaRef.current.selectionEnd = start.length + emoji.length;
    setCursorPostion(start.length + emoji.length);
  };

  // handle add image And Video
  const handleAddImageAndVideo = (e) => {
    const files = [...e.target.files];
    let error = null;
    const newImage = [];
    files.forEach((file) => {
      error = checkMedia(file);
      if (error) return;
      return newImage.push(file);
    });

    if (error) {
      dispatch({ type: RESPONSEMESSAGE, payload: { error: error } });
    }
    setImages([...images, ...newImage]);
  };

  // handle delete img and Video
  const handleDeleteImageAndVideo = (idx) => {
    const ImagesClone = [...images];
    ImagesClone.splice(idx, 1);
    setImages([...ImagesClone]);
  };

  // Handle Add Post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: RESPONSEMESSAGE,
        payload: { error: "Please Add Image" },
      });
    }
    setIsClickSave(true);
    if (postModelState.isEdit) {
      dispatch(updatePost({ caption, images, auth, postModelState, posts }));
    } else {
      dispatch(createPost({ caption, images, auth, socket }));
    }
    setCaption("");
    setImages([]);
    dispatch({ type: MODEL_POST, payload: false });
    showScroll();
  };

  // close model
  const handleCloseModel = () => {
    showScroll();
    dispatch({ type: MODEL_POST, payload: false });
  };
  return (
    <Box onClick={handleCloseModel}>
      <CoverModal>
        <Box
          sx={{
            width: { xs: "95vw", sm: "94vw", md: "400px", lg: "600px" },
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid var(--lineColor)",
              padding: "10px",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", fontSize: "18px", userSelect: "none" }}
            >
              Create a new Post
            </Typography>
          </Box>
          <Box sx={{ padding: "10px" }}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ padding: " 10px 0px" }}
              gap="10px"
            >
              <Stack sx={{ margin: "0 5px" }}>
                {AvatarUser(auth.user.avatar, auth.user.username, {
                  width: 50,
                  height: 50,
                })}
              </Stack>

              <Box>
                <Stack sx={{ marginTop: "1px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      userSelect: "none",
                    }}
                  >
                    {auth?.user?.username}
                  </Typography>
                </Stack>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                      userSelect: "none",
                    }}
                  >
                    public
                  </Typography>
                  <PublicIcon
                    style={{
                      fontSize: "16px",
                      margin: " 3px",
                      color: "#1976d2",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ margin: "10px 10px" }}>
              <form style={{ padding: "10px 20px" }} onSubmit={handleAddPost}>
                <FormControl>
                  <textarea
                    value={caption}
                    rows="4"
                    cols="50"
                    ref={textareaRef}
                    onChange={(e) => setCaption(e.target.value)}
                    dir="auto"
                    style={{
                      resize: "none",
                      border: "none",
                      fontSize: "18px",
                      fontWeight: "500",
                      width: "100%",
                      color: "#fff",
                      backgroundColor: "inherit",
                    }}
                    placeholder="What are you thinking?"
                  />
                </FormControl>
                <Box
                  sx={{
                    maxHeight: "250px",
                    width: "100%",
                    overflowY: "auto",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill , minMax(150px , 1fr))",
                    gap: "5px",
                    placeItems: "center",
                  }}
                >
                  {images?.map((image, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        position: "relative",
                        width: "100%",
                        padding: "10px 0px",
                      }}
                    >
                      <>
                        {image.type.match(/video/i)
                          ? showVideo(URL.createObjectURL(image))
                          : showImage(URL.createObjectURL(image))}
                      </>
                      <Box
                        onClick={() => handleDeleteImageAndVideo(idx)}
                        sx={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          border: "1px solid #000",
                          width: " 30px",
                          height: "30px",
                          padding: "1px",
                          background: "#fff",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CancelIcon style={{ color: "#363636" }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Stack>
                  <button
                    className="mainButton"
                    style={
                      isClickSave || !post
                        ? {
                            cursor: "no-drop",
                            fontWeight: "600",
                            fontSize: "17px",
                            backgroundColor: "var(--bgColor)",
                            padding: "14px",
                          }
                        : {
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "17px",
                            backgroundColor: "var(--bgColor)",
                            padding: "14px",
                          }
                    }
                    type="submit"
                  >
                    {isClickSave ? "Loading..." : "Share"}
                  </button>
                </Stack>
              </form>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  border: "1px solid var(--lineColor)",
                  borderRadius: "10px",
                  margin: "20px",
                }}
              >
                <Stack sx={{ margin: "0 10px", position: "relative" }}>
                  <Tooltip
                    title="Emoji"
                    arrow
                    sx={{ position: "absoulte", zIndex: 99999 }}
                  >
                    <IconButton size="large" onClick={handleShowEmoji}>
                      <EmojiEmotionsOutlinedIcon
                        style={{ fontSize: "35px", color: "var(--iconColor)" }}
                      />
                    </IconButton>
                  </Tooltip>
                  {showEmoji && (
                    <Box
                      sx={{
                        position: "absolute",
                        overflow: "hidden",
                        height: "200px !important",
                        zIndex: 999,
                        width: "fit-content",
                        bottom: "60px",
                      }}
                    >
                      <Picker
                        onSelect={handleAddEmoji}
                        enableFrequentEmojiSort={false}
                        showPreview={false}
                        showSkinTones={false}
                        set="twitter"
                        theme="dark"
                        color="#1976d2"
                      />
                    </Box>
                  )}
                </Stack>

                <Stack sx={{ margin: "0 10px" }}>
                  <Tooltip title="Gallery" arrow>
                    <IconButton size="large" onClick={handelOpenInputFile}>
                      <input
                        aspect="image/*,video/*"
                        type="file"
                        ref={fileRef}
                        onChange={handleAddImageAndVideo}
                        multiple
                        style={{ display: "none" }}
                      />
                      <InsertPhotoOutlinedIcon
                        style={{ fontSize: "35px", color: "var(--iconColor)" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>
      </CoverModal>
    </Box>
  );
}

export default PostModal;
