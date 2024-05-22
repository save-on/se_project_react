import { processServerRequest } from "./weatherApi";

export const signUp = (baseUrl, { email, password, name, avatarURL }) => {
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
      avatarURL,
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
