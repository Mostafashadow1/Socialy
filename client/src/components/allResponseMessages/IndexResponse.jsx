import React from "react";
import { useSelector } from "react-redux";
import { Loading, ErrorMessage } from "components/index";
import { resMessagesState } from "../../redux/store";
function IndexResponse() {
  const resMessages = useSelector(resMessagesState);
  return (
    <>
      {resMessages.loading && <Loading />}
      {resMessages.error && <ErrorMessage />}
    </>
  );
}

export default IndexResponse;
