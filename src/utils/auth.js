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
