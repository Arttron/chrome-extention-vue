import axios from 'axios';

const BACKEND_URL = 'https://custom-logo-api.loogl.net/v1/extension';

axios.interceptors.response.use(
  (response) => {
    if (response.status < 300) {
      return response.data;
    }
    return response;
  },
);

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getCollectionsByType = async (type) => {
  const { data } = await axiosInstance.get(`/collections/type/${type}?offset=0&limit=100`);
  return data;
};
