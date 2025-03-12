import styled from 'styled-components';
import mainBg from '@/assets/images/mainBg.png';
import Footer from '@/common/Footer';
import { Search, Menu } from '@/assets/icons';

const MainPage = () => {
  return (
    <MainWrapper>
      <MainContent>
        <Header>
          <Logo>로고</Logo>
          <Icons>
            <Search />
            <Menu />
          </Icons>
        </Header>
        <Title>
          로그인하고 사이트를
          <br />
          편하게 즐겨보세요.
        </Title>
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
  padding: 1.25rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  margin-top: 2rem;
`;
