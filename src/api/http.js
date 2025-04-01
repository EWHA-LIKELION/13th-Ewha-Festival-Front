import axios from 'axios';
import Cookies from 'js-cookie';

// axios 인스턴스
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000, //기본 10초로 설정하긴 했는데.. 추후 수정하거나 없애도 됨. 더 긴 건 각 요청에서 개별 설정하기
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: {
    indexes: null
  }
});

// 요청 인터셉터
api.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // 401 (인증 만료)
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');

        if (refreshToken) {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/accounts/refresh/`,
            { refresh_token: refreshToken }
          );

          const { access_token } = response.data;
          Cookies.set('accessToken', access_token);

          error.config.headers.Authorization = `Bearer ${access_token}`;

          return api(error.config);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
      }
    }

    // 404 (Not Found)
    if (error.response?.status === 404) {
      // 추후 404 페이지 퍼블리싱 후 렌더링하기!
    }

    return Promise.reject(error);
  }
);

// API 요청 헬퍼 함수
const http = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config)
};

export default http;
