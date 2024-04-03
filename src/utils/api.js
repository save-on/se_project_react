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
  console.log(id)
  return serverRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};


// When new card is created it's not given an id for deleting
// when created it gives me an id in the preview section although the payload doesn't have an id property
