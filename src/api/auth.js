import Cookies from 'js-cookie';

// 카카오 로그인 URL
export const getKakaoAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    response_type: 'code'
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

// <로그인> 함수
export const handleLogin = (token, userData) => {
  Cookies.set('accessToken', token, { expires: 3 });
  localStorage.setItem('user', JSON.stringify(userData));
};

// <로그아웃> 함수
export const handleLogout = () => {
  Cookies.remove('accessToken');
  localStorage.removeItem('user');
};

// <로그인 여부 확인> 함수
export const isLoggedIn = () => {
  return !!Cookies.get('accessToken');
};

// <사용자 정보 추출> 함수
export const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export default {
  getKakaoAuthUrl,
  handleLogin,
  handleLogout,
  isLoggedIn,
  getUserInfo
};
