// eslint-disable-next-line no-unused-vars
const BASE_URL = 'http://localhost:4000/api';

export const makeHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};
  //Added a default value to token if no token is given
  export const fetchWithHeaders = async (url, method, body, token) => {
    console.log(url);
    console.log(method);
    console.log(body);
    console.log(makeHeaders(token));

    try {
      const response = await fetch(url, {
        method,
        headers: makeHeaders(token),
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred during the fetch request.');
    }
  };

