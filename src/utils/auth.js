import { processServerRequest } from "./weatherApi";
import { baseUrl } from "./constants";

export const signUp = ({ email, password, name, avatar }) => {
  return processServerRequest(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  });
};

export const signIn = ({ email, password }) => {
  return processServerRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const getUserInfo = (token) => {
  return processServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const editUserInfo = ({ name, avatar }, token) => {
  return processServerRequest(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const addCardLike = (_id, token) => {
  return processServerRequest(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (_id, token) => {
  return processServerRequest(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
