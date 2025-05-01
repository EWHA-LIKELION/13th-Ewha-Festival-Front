import http from './http';

// GET: 검색 결과
export const searchResults = async (params = {}) => {
  const { q, cursor } = params;

  if (!q || q.trim() === '') {
    throw new Error('검색어를 입력하세요.');
  }

  const requestParams = { q };

  if (cursor) {
    requestParams.cursor = cursor;
  }

  return http.get('/search/booths/', { params: requestParams });
};

export default {
  searchResults
};
