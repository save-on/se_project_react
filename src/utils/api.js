import { processServerRequest } from "./weatherApi";

export const getClothing = (baseUrl) => {
  return processServerRequest(`${baseUrl}/items`);
};

export const addClothing = (baseUrl, { name, imageUrl, weather }) => {
  return processServerRequest(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

export const deleteClothing = (baseUrl, id) => {
  return processServerRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};