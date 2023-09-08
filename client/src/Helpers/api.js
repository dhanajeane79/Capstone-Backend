// eslint-disable-next-line no-unused-vars
const BASE_URL = 'https://fakestoreapi.com/';

export const makeHeaders = (token) => {
    const headers = {
      //Added charset=utf-8  - pat
      'Content-Type': 'application/json; charset=utf-8',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    return headers;
  };
  //Added a default value to token if no token is given
  export const fetchWithHeaders = async (url, method, body, token='') => {
    console.log(url)
    console.log(method)
    console.log(body)
    console.log(makeHeaders(token))

    try {
      const response = await fetch(url, {
       
        method: method,
        headers: makeHeaders(token),
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      throw new Error('An error occurred during the fetch request.');
    }
  };

