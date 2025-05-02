import http from './http';

// GET: 스크랩 목록
export const getScrapList = async (params = {}) => {
  const { cursor } = params;
  const requestParams = {};

  if (cursor) {
    requestParams.cursor = cursor;
  }

  return http.get('/mypages/scrapbook/', { params: requestParams });
};

// POST: 부스 스크랩
export const scrapBooth = async boothId => {
  return http.post(`/scrap/${boothId}/`);
};

// DELETE: 부스 스크랩
export const unscrapBooth = async boothId => {
  return http.delete(`/scrap/${boothId}/`);
};
