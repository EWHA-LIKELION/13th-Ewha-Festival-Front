import styled from 'styled-components';
import { ArrowLeft } from '@/assets/icons';
import { KakaoChat } from '@/assets/icons';
import loginBg from '@/assets/images/loginBg.png';
import { getKakaoAuthUrl } from '@/api/auth';

const handleKakaoLogin = () => {
  window.location.href = getKakaoAuthUrl();
};

const LoginPage = () => {
  return (
    <>
      <BackIcon />
      <Content>
        <Title>
          2025 대동제,
          <br />
          즐길 준비 되셨나요?
        </Title>
        <SubTitle>로그인하고 사이트를 더 편하게 즐겨보세요!</SubTitle>
        <LoginBtn onClick={handleKakaoLogin}>
          <KakaoChat />
          카카오톡 간편 로그인
        </LoginBtn>
      </Content>
      <BackgroundImage src={loginBg} />
    </>
  );
};

export default LoginPage;

const BackIcon = styled(ArrowLeft)`
  position: absolute;
  margin: 1.63rem 1.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90dvh;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.semibold_24pt}
  text-align: center;
  margin-bottom: 0.69rem;
`;
const SubTitle = styled.h3`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  margin-bottom: 3.75rem;
`;
const LoginBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 16rem;
  border-radius: 0.5rem;
  padding: 0.75rem 0;
  background-color: #ffea2b;
  ${({ theme }) => theme.fontStyles.semibold_14pt}
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
`;
