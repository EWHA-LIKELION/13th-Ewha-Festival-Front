import http from './http';

// GET: 부스 목록
export const getBooths = async (params = {}) => {
  const requestParams = {};

  if (params.cursor) {
    requestParams.cursor = params.cursor;
  }

  ['category', 'location', 'day_of_week'].forEach(key => {
    if (Array.isArray(params[key]) && params[key].length > 0) {
      requestParams[key] = params[key];
    }
  });

  return http.get('/booths/', { params: requestParams });
};

// GET: 필터링된 부스 개수
export const getBoothsCount = async (filters = {}) => {
  const requestParams = {};

  ['category', 'location', 'day_of_week'].forEach(key => {
    if (Array.isArray(filters[key]) && filters[key].length > 0) {
      requestParams[key] = filters[key];
    }
  });

  return http.get('/booths/counts', { params: requestParams });
};

// POST: 부스 스크랩
export const scrapBooth = async boothId => {
  return http.post(`/scrap/${boothId}/`);
};

// DELETE: 부스 스크랩
export const unscrapBooth = async boothId => {
  return http.delete(`/scrap/${boothId}/`);
};
