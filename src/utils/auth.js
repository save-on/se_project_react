import { processServerRequest } from "./weatherApi";

export const signUp = (baseUrl, { email, password, name, avatar }) => {
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

export const signIn = (baseUrl, { email, password }) => {
  return processServerRequest(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const getUserInfo = (baseUrl, token) => {
  return processServerRequest(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const editUserInfo = (baseUrl, { name, avatar }, token) => {
  return processServerRequest(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

export const addCardLike = (baseUrl, _id, token) => {
  return processServerRequest(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (baseUrl, _id, token) => {
  return processServerRequest(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
