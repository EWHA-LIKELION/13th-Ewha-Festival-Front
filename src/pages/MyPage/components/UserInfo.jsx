import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { handleLogout } from '@/api/auth';
import userInfoBg from '@/assets/images/userInfo.png';
import useUserStore from '@/store/useScrapStore';

const UserInfo = () => {
  const { user, updateUser } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    updateUser();
    navigate('/login');
  };

  return (
    <Container>
      <BackgroundImage src={userInfoBg} alt='User Info Background' />
      <UserDetails>
        <UserName>
          {user ? `${user.nickname} 님` : '로그인이 필요합니다.'}
        </UserName>
        {user ? (
          <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
        )}
      </UserDetails>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 6.25rem;
  padding: 3.25rem 1.5rem 1.12rem 1.5rem;
  border-radius: 0.6875rem;
  background: var(--green1-100, #18bb7a);
  color: white;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const UserDetails = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.h2`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.semibold_20pt}
`;

const LogoutButton = styled.button`
  background: white;
  color: var(--gray3, #787878);
  border-radius: 1.25rem;
  padding: 0.5rem 0.75rem;
  ${({ theme }) => theme.fontStyles.regular_12pt}
  cursor: pointer;
`;

const LoginButton = styled.button`
  background: white;
  color: var(--gray3, #787878);
  border-radius: 1.25rem;
  padding: 0.5rem 0.75rem;
  ${({ theme }) => theme.fontStyles.regular_12pt}
  cursor: pointer;
`;
