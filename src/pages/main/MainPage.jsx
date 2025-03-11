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
          <Search />
          <Menu />
        </Header>
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
  display: flex;
  margin: 1.25rem 0;
`;

const Logo = styled.div``;
