const serverRequest = (baseUrl, options) => {
  return fetch(baseUrl, options).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
};

export const getClothing = (baseUrl) => {
  return serverRequest(`${baseUrl}/items`);
};

export const addClothing = (baseUrl, { name, imageUrl, weather }) => {
  return serverRequest(`${baseUrl}/items`, {
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
  return serverRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};
