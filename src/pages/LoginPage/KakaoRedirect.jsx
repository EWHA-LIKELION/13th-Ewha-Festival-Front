import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '@/api/auth';
import http from '@/api/http';
import LoadingScreen from '@/common/LoadingScreen';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processKakaoLogin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');

      if (!code) {
        console.error('인증 코드 찾을 수 없음');
        navigate('/login');
        return;
      }

      try {
        const response = await http.get(process.env.REACT_APP_KAKAO_ENDPOINT, {
          params: { code }
        });
        const { data } = response.data;

        handleLogin(data.access_token, data.refresh_token, {
          id: data.id,
          username: data.username,
          nickname: data.nickname,
          is_booth: data.is_booth
        });

        window.location.href = '/';
      } catch (err) {
        console.error('로그인 처리 중 오류:', err);
        navigate('/login');
      }
    };

    processKakaoLogin();
  }, [navigate]);

  return <LoadingScreen />;
};

export default KakaoRedirect;
