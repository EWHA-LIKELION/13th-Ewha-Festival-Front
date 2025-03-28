import React from 'react';
import styled from 'styled-components';
import { Search, Menu } from '@/assets/icons';
import UserInfo from '@/pages/MyPage/components/UserInfo';
import ScrapBook from '@/pages/MyPage/components/ScrapBook';
import AdminSection from '@/pages/MyPage/components/AdminSection';

const MyPage = () => {
  return (
    <PageWrapper>
      <Header>
        <Logo>로고</Logo>
        <Icons>
          <Search />
          <Menu />
        </Icons>
      </Header>
      <UserInfo />
      <ScrapBook />
      <AdminSection />
    </PageWrapper>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
