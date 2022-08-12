import React, { createElement } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "../redux/store";
import Notfound from "./Notfound";
import InfoLogin from "./InfoLogin";
function PageRender() {
  const auth = useSelector(authState);
  
  const handleGenratePage = (pageName) => {
    const component = () => require(`./${pageName}`).default;
    try {
      return createElement(component());
    } catch (err) {
      return localStorage.getItem("login") ? <Notfound /> : <InfoLogin />;
    }
  };
  const { page, id } = useParams();
  let pageName = "";
  if (auth.token) {
    if (!id) pageName = page;
    else {
      pageName = `${page}/[id]`;
    }
  }
  return handleGenratePage(pageName);
}

export default PageRender;
