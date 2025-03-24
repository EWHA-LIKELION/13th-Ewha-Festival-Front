import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mainBg from '@/assets/images/mainBg.png';
import Footer from '@/common/Footer';
import { Search, Menu } from '@/assets/icons';
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
        <Header>
          <Logo>로고</Logo>
          <Icons>
            <Search />
            <Menu />
          </Icons>
        </Header>

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

const Header = styled.div`
  width: 100%;
  max-width: 440px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: start;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  height: 7rem;
  padding: 1.25rem;
  z-index: 10;
`;

const Logo = styled.div`
  width: 4.5rem;
  height: 2.25rem;
  background-color: #d7d7d7;
  display: grid;
  place-items: center;
`;

const Icons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.regular_24pt}
  color: white;
  margin-top: 6rem;
  padding-left: 1.25rem;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`;
