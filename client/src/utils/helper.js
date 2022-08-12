import { Avatar } from "@mui/material";

// Edit Data
export const editData = (data, id, action) => {
  const newData = data.map((item) => (item._id === id ? action : item));
  return newData;
};

// Remove Data
export const deleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

export const AvatarUser = (src, alt, styled) => {
  if (src !== undefined) {
    return <Avatar src={src} style={styled} />;
  }
  return (
    <Avatar sx={{ bgcolor: "var(--activeColor)" }} style={styled}>
      {alt?.slice(0, 1).toUpperCase()}{" "}
    </Avatar>
  );
};
