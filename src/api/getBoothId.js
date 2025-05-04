import http from './http';

const getBoothId = async () => {
  try {
    const res = await http.get('/mypages/boothcount/');
    return res.data.booth_id;
  } catch (error) {
    console.error('boothId 가져오기 실패:', error);
    throw error;
  }
};

export default getBoothId;
