import axios from "axios";

export const GetAPIData = async (url, token) => {
  const response = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return response;
};

export const PostAPIData = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const PutAPIData = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const PatchAPIData = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const DeleteAPIData = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
