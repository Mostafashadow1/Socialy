import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IndexResponse } from "components/index";
import { refreshToken } from "./redux/actions/actionAuth";
import {
  authState,
  openModelPost,
  resMessagesState,
  socketState,
} from "./redux/store";
import { HeaderComp, PostModal, LoadingPage } from "components/index";
import Notfound from "./pages/Notfound";
import SocketClient from "./SocketClient";
import { io } from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/constant";
const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import("./pages/home"));
const PageRender = lazy(() => import("./pages/PageRender"));
const Register = lazy(() => import("./pages/register"));

function App() {
  const dispatch = useDispatch();
  const { SOCKET } = GLOBALTYPES;
  const socket = useSelector(socketState);
  const postModel = useSelector(openModelPost);
  const auth = useSelector(authState);
  const responseMessage = useSelector(resMessagesState);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  //   socket io
  useEffect(() => {
    const socket = io("https://instgram-clone-mern.herokuapp.com/");
    dispatch({ type: SOCKET, payload: socket });
    return () => socket.close();
  }, [SOCKET, dispatch]);

  if (responseMessage.loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        {auth.token && socket && <SocketClient />}
        {auth.token && <HeaderComp />}
        {postModel && <PostModal />}

        <Box sx={{ minHeight: "91vh" }}>
          <IndexResponse />
          <Routes>
            <Route path="/" element={auth.user ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:id" element={<PageRender />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Box>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
