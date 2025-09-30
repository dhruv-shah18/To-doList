// api.js
import axios from 'axios';

export const makeRequest = async ({
  method = 'get',
  url,
  data = null,
  params = null,
  headers = {},
}) => {
  try {
    const response = await axios({
      method: method.toLowerCase(), // e.g., 'get', 'post'
      url: `${url}`,      // combine baseURL + endpoint
      data,
      params,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // allow override or addition
      },
    });

    return response.data; // return only the useful part
  } catch (error) {
    console.error(`API ${method.toUpperCase()} ${url} failed:`, error);
    throw error.response?.data || error.message || 'Unexpected error';
  }
};
