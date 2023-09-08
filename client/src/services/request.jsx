import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');
const makeAuthenticatedRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: baseUrl + url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: data
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default makeAuthenticatedRequest;
