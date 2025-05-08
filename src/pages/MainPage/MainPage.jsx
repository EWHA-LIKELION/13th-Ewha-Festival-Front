import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import mainBg from '@/assets/images/mainBg.png';
import Header from '@/common/Header';
import Signpost from './components/Signpost';
import { isLoggedIn, getUserInfo } from '@/api/auth';
import Popup from './components/Popup';

const MainPage = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const userInfo = loggedIn ? getUserInfo() : null;
  const nickname = userInfo?.nickname || '';

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [location]);

  //팝업 로직
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const popupClosed = localStorage.getItem('popupClosed');
    const today = new Date().toDateString();

    if (popupClosed !== today) {
      setIsPopupOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
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
      {isPopupOpen && <Popup onClose={closePopup} />}
    </MainContent>
  );
};

export default MainPage;

const MainContent = styled.div`
  display: flex;
  background-image: url(${mainBg});
  background-size: cover;
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
