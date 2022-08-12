

const styled = {
  display: "block",
  objectFit: "cover",
  width: "100%",
  height: "100%",
};
// handle Show Image
export const showImage = (src, style = styled) => {
  return <img style={style} src={src} alt="imaged" loading="lazy" />;
};
// handle Show Video
export const showVideo = (src, style = styled) => {
  return <video controls style={style} src={src} alt="imaged" loading="lazy" />;
};
