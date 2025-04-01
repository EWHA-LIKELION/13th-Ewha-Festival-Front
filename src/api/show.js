import http from './http';

// GET: 공연 목록
export const getShows = async (params = {}) => {
  const requestParams = {};

  if (params.cursor) {
    requestParams.cursor = params.cursor;
  }

  ['category', 'location', 'day_of_week'].forEach(key => {
    if (Array.isArray(params[key]) && params[key].length > 0) {
      requestParams[key] = params[key];
    }
  });

  return http.get('/shows/', { params: requestParams });
};

// GET: 필터링된 공연 개수
export const getShowsCount = async (filters = {}) => {
  const requestParams = {};

  ['category', 'location', 'day_of_week'].forEach(key => {
    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      requestParams[key] = filters[key];
    }
  });

  return http.get('/shows/counts', { params: requestParams });
};

// POST: 공연 스크랩
export const scrapShow = async showId => {
  return http.post(`/scrap/show/${showId}/`);
};

// DELETE: 공연 스크랩
export const unscrapShow = async showId => {
  return http.delete(`/scrap/show/${showId}/`);
};
