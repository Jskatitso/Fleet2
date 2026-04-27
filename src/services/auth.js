import api from './api';

export const signupRider = async (data) => {
  const response = await api.post('/riders/signup', data);
  return response.data;
};

export const loginRider = async (credentials) => {
  const response = await api.post('/riders/login', credentials);
  return response.data;
};