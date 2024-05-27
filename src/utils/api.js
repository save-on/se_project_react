import { processServerRequest } from "./weatherApi";
import { baseUrl } from "./constants";

export const getClothing = () => {
  return processServerRequest(`${baseUrl}/items`);
};

export const addClothing = ({ name, imageUrl, weather }, token) => {
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

export const deleteClothing = (id, token) => {
  return processServerRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
