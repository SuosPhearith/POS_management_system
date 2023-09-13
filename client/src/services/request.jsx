
import axios from 'axios';
import tokenConverter from '../utils/TokenConverter';
import localhostStorageSave from '../utils/LocalStorageSave';

const baseUrl = process.env.REACT_APP_API_URL;

const makeAuthenticatedRequest = async (method, url, data = null, access_token = null) => {
  let token = localStorage.getItem('access_token');

  if (access_token !== null) {
    token = access_token;
  }

  try {
    const response = await axios({
      method: method,
      url: baseUrl + url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });

    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      return refreshToken(method, url, data)
        .then((newAccessToken) => {
          return makeAuthenticatedRequest(method, url, data, newAccessToken);
        })
        .catch((refreshError) => {
          throw refreshError;
        });
    } else {
      throw error;
    }
  }
};

const refreshToken = (method, url, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const refresh_key = {
        refresh_token: localStorage.getItem('refresh_token'),
      };

      const response = await axios.post(baseUrl + 'auth/refreshToken', refresh_key);

      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      const tokenData = tokenConverter(access_token);

      localhostStorageSave(
        access_token,
        refresh_token,
        tokenData.id,
        tokenData.username,
        tokenData.fullname,
        tokenData.role_id
      );
      resolve(access_token);
    } catch (error) {
      reject(error);
    }
  });
};

export default makeAuthenticatedRequest;

