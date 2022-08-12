export const checkAvatar = (file) => {
  let error = "";
  if (!file) {
    return (error = "File does not exist .");
  }
  if (
    file.type !== "image/png" &&
    file.type !== "image/jpg" &&
    file.type !== "image/jpeg"
  ) {
    return (error = "type file is incorrect");
  }
  if (file.size > 2048 * 2048) {
    return (error = "this Image is big size ");
  }

  return error;
};

