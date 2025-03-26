import http from './http';

export const getBooths = async (params = {}) => {
  return http.get('/booths/', { params });
};
