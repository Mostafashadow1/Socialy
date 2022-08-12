import loadingIcon from "../../assets/images/loading.gif";
function Loading({ width, margin }) {
  const styledLoading = {
    width: width,
    margin: margin ? margin : "0px auto",
    display: "block",
  };
  return <img src={loadingIcon} style={styledLoading} alt="loadIcon" />;
}

export default Loading;
