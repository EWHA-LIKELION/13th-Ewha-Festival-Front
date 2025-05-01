import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mainBg from '@/assets/images/mainBg.png';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import Signpost from './components/Signpost';
import { isLoggedIn, getUserInfo } from '@/api/auth';

const MainPage = () => {
  const loggedIn = isLoggedIn();
  const userInfo = loggedIn ? getUserInfo() : null;
  const nickname = userInfo?.nickname || '';

  return (
    <MainWrapper>
      <MainContent>
        {/* 헤더 */}
        <Header isMain />

        {/* 타이틀 */}
        {loggedIn ? (
          <Title>
            <strong>{nickname}</strong> 님,
            <br />
            어디로 가볼까요?
          </Title>
        ) : (
          <Title>
            <LoginLink to='/login'>로그인</LoginLink>하고 사이트를
            <br />
            편하게 즐겨보세요.
          </Title>
        )}

        {/* 표지판 */}
        <Signpost />
      </MainContent>
      <Footer />
    </MainWrapper>
  );
};

export default MainPage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  background-image: url(${mainBg});
  background-size: cover;
  background-position: bottom;
  height: 100dvh;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.regular_24pt}
  color: var(--green3);
  margin-top: 6rem;
  padding-left: 1.25rem;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;
