import React, { useState, useEffect, createRef, useRef } from "react";
import { Picker } from "emoji-mart";
// @mui
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
// redux && store
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { authState, chatsState, socketState } from "redux/store";
import {
  deleteChat,
  getMessages,
  loadMoreMessages,
  sendMessage,
} from "redux/actions/actionChats";

// utils
import { CHATS_TYPES, GLOBALTYPES } from "redux/actions/constant";
import { showVideo, showImage } from "utils/media";
import { uploadImages } from "utils/uploadImages";

// components
import { Loading, UserChat, DisplayMessage } from "components/index";

function Chat() {
  const styledChatContainer = {
    width: "100%",
    height: "calc(100% - 130px)",
    overflowY: "scroll",
  };
  const styledInput = {
    resize: "none",
    width: "100%",
    border: "none",
    outlineWidth: "0",
    fontSize: "16px",
    overflowY: "auto",
    height: "19px",
    color: "#fff",
    backgroundColor: "inherit",
  };
  const styledAppMessage = {
    display: "grid",
    gridTemplateColumns: "70%",
    margin: "10px",
  };
  // States And Functions
  const { GET_MESSAGES } = CHATS_TYPES;
  const textareaRef = createRef();
  const fileRef = useRef();
  const pageEndRef = useRef();
  const messageRef = useRef(); // Scrolling Smoths
  const { RESPONSEMESSAGE } = GLOBALTYPES;
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  const chats = useSelector(chatsState);
  const socket = useSelector(socketState);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPostion, setCursorPostion] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loadMoreCount, setLoadMoreCount] = useState(0);

  // Get user chat in chat header
  useEffect(() => {
    if (id && chats.chatsUsers.length > 0) {
      setTimeout(() => {
        messageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 200);
    }
    const getUser = chats.chatsUsers.find((user) => user._id === id);
    if (getUser) {
      setUser(getUser);
    }
  }, [chats.chatsUsers, id]);

  // Handle Get Messages [first one]
  useEffect(() => {
    const getMessagesData = () => {
      if (chats.data.every((item) => item._id !== id)) {
        dispatch(getMessages({ auth, id }));
      }
    };
    getMessagesData();
  }, [GET_MESSAGES, auth, chats, dispatch, id]);

  // Check messages is our mine (auth === and users)
  useEffect(() => {
    const newData = chats.data.find((item) => item._id === id);
    if (newData) {
      setMessages(newData.messages);
      setMessagesCount(newData.messagesCount);
      setPage(newData.page);
    }
  }, [chats.data, id, auth]);

  useEffect(() => {
    textareaRef.current.selectionEnd = cursorPostion;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPostion]); // Don't add  textareaRef => render

  // load More Messages
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadMoreCount((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEndRef.current);
  }, [setLoadMoreCount]);

  // get sum  messages
  useEffect(() => {
    if (loadMoreCount > 1) {
      if (messagesCount >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setLoadMoreCount(1);
      }
    }
  }, [
    auth,
    chats.messagesCount,
    dispatch,
    id,
    loadMoreCount,
    messagesCount,
    page,
  ]);

  const handleShowEmoji = () => {
    textareaRef.current.focus();
    setShowEmoji(!showEmoji);
  };
  // handel add show in textarea => (focus curssor )
  const handleAddEmoji = (e) => {
    const emoji = e.native;
    const ref = textareaRef.current;
    ref.focus();
    const start = messageText.substring(0, ref.selectionStart);
    const end = messageText.substring(ref.selectionStart);
    const text = start + emoji + end;
    setMessageText(text);
    textareaRef.current.selectionEnd = start.length + emoji.length;
    setCursorPostion(start.length + emoji.length);
  };

  // handle add image And Video
  const handleAddMedia = (e) => {
    const files = [...e.target.files];
    let error = null;
    const newMedia = [];
    files.forEach((file) => {
      if (!file) return (error = "File does not exist.");
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg"
      ) {
        return (error = "Add Image Or Video");
      }
      if (file.size > 1024 * 1024 * 5) {
        error = "this file is largest is 5mb";
      }
      return newMedia.push(file);
    });

    if (error) {
      dispatch({ type: RESPONSEMESSAGE, payload: { error: error } });
    }
    setMedia([...media, ...newMedia]);
  };
  // handel open InputFile
  const handelOpenInputFile = () => {
    fileRef.current.click();
  };

  // handle delete img and Video
  const handleDeleteImageAndVideo = (idx) => {
    const ImagesClone = [...media];
    ImagesClone.splice(idx, 1);
    setMedia([...ImagesClone]);
  };

  // handle Add Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() && media.length === 0) return;
    setMessageText("");
    setMedia([]);
    setLoadingMedia(true);
    let newMedia = [];
    if (media.length > 0) {
      newMedia = await uploadImages(media);
    }
    const msg = {
      sender: auth.user._id,
      recipient: id,
      messageText,
      media: newMedia,
      createdAt: new Date().toISOString(),
    };
    setLoadingMedia(false);
    await dispatch(sendMessage({ msg, auth, socket }));
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // handle delete chat
  const handleDeleteChat = () => {
    if (!id) return;
    if (window.confirm("Do youe want delete chat ?")) {
      dispatch(deleteChat({ id, auth }));
      return navigate("/chats");
    }
  };

  // check user type message or no
  const userTypeMessage = messageText.trim() || media.length > 0 ? false : true;

  return (
    <Box height="inherit">
      <Box
        sx={{
          borderBottom: "1px solid var(--lineColor)",
          height: "70px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex="1"
        >
          <UserChat user={user} userOnline={user.online} />
          <Box display="flex" alignItems="center" gap="2px" marginRight="10px">
            <Tooltip title="Delete Chat">
              <IconButton onClick={handleDeleteChat}>
                <DeleteOutlinedIcon style={{ color: "var(--iconColor)" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Box style={styledChatContainer}>
        <Box ref={messageRef}>
          <button
            ref={pageEndRef}
            style={{ pointerEvents: "none", opacity: "1" }}
          />
          {messages && messages?.map((message, idx) => (
            <Box key={idx}>
              {message.sender === auth.user._id && (
                <Box
                  style={styledAppMessage}
                  justifyContent="end"
                  justifyItems="end"
                >
                  <DisplayMessage
                    user={auth?.user}
                    message={message && message}
                    auth={auth}
                    messages={messages && messages}
                    myMessage
                  />
                </Box>
              )}
              {message?.sender !== auth?.user._id && (
                <Box
                  style={styledAppMessage}
                  justifyContent="start"
                  justifyItems="start"
                >
                  <DisplayMessage
                    user={user}
                    message={message}
                    messages={messages}
                    auth={auth}
                    youMessage
                  />
                </Box>
              )}
            </Box>
          ))}

          {loadingMedia && <Loading width="30px" margin="0px 10px 0px auto" />}
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          top: "-100px",
          maxHeight: "100px",
          width: "100%",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill , minMax(150px , 1fr))",
          gap: "5px",
          placeItems: "center",
        }}
      >
        {media &&
          media?.map((imageOrVideo, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {imageOrVideo.type.match(/video/i)
                ? showVideo(URL.createObjectURL(imageOrVideo))
                : showImage(URL.createObjectURL(imageOrVideo))}

              <Box
                onClick={() => handleDeleteImageAndVideo(idx)}
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  border: "1px solid var(--lineColor)",
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
      <Box
        border="1px solid var(--lineColor)"
        height="60px"
        borderRadius="5px"
        position="absolute"
        width="100%"
        sx={{ bottom: { xs: "33px", sm: 0 } }}
        zIndex="99999"
        backgroundColor="var(--secondColor)"
      >
        <form
          onSubmit={handleSendMessage}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" flex="1">
            <Box padding="0px 10px" position="relative">
              {showEmoji && (
                <Box
                  sx={{
                    position: "absolute",
                    overflow: "hidden",
                    height: "220px",
                    zIndex: 99999,
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
                    color="#000"
                    theme="dark"
                  />
                </Box>
              )}
              <IconButton onClick={handleShowEmoji}>
                <EmojiEmotionsOutlinedIcon
                  style={{ fontSize: "35px", color: "var(--iconColor)" }}
                />
              </IconButton>
              <IconButton onClick={handelOpenInputFile}>
                <InsertPhotoOutlinedIcon
                  style={{ fontSize: "35px", color: "var(--iconColor)" }}
                />
                <input
                  type="file"
                  ref={fileRef}
                  style={{ display: "none" }}
                  onChange={handleAddMedia}
                  multiple
                  accept="/images,/video"
                />
              </IconButton>
            </Box>
            <Box flex="1">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                ref={textareaRef}
                style={styledInput}
                placeholder="Message."
                dir="auto"
              />
            </Box>
          </Box>

          <Box marginRight="10px">
            <IconButton
              type="submit"
              disabled={messageText.trim() || media.length > 0 ? false : true}
            >
              <Button
                disabled={userTypeMessage}
                style={
                  !userTypeMessage
                    ? {
                        color: "var(--activeColor)",
                        fontSize: "20px",
                        cursor: "pointer",
                      }
                    : {
                        color: "#fff",
                        fontSize: "20px",
                        opacity: 0.3,
                      }
                }
              >
                Send
              </Button>
            </IconButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Chat;
