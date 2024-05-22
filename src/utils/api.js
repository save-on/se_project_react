import { processServerRequest } from "./weatherApi";

export const getClothing = (baseUrl) => {
  return processServerRequest(`${baseUrl}/items`);
};

export const addClothing = (baseUrl, { name, imageUrl, weather }, token) => {
  return processServerRequest(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

export const deleteClothing = (baseUrl, id, token) => {
  return processServerRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
