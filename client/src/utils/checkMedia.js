export const checkMedia = (file) => {
  let error = "";
  if (!file) {
    return (error = "file does not exist .");
  }
  if (
    file.type !== "image/png" &&
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg" &&
    file.type !== "video/mp4"
  ) {
    return (error = "type file is incorrect");
  }
  if (file.size > 2048 * 2048) {
    return (error = "this file is big size ");
  }

  return error;
};
