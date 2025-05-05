import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import http from '@/api/http';
import Header from '@/common/Header';
import UserInfo from '@/pages/MyPage/components/UserInfo';
import ScrapBook from '@/pages/MyPage/components/ScrapBook';
import AdminSection from '@/pages/MyPage/components/AdminSection';
import MyBoothInfo from '@/pages/MyPage/components/MyBoothInfo';
import { isLoggedIn } from '@/api/auth';
import LoginBottomSheet from '@/common/LoginBottomSheet';

const MyPage = () => {
  const [boothInfo, setBoothInfo] = useState(null);
  const [showLoginSheet, setShowLoginSheet] = useState(false);

  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      setShowLoginSheet(true);
      return;
    }

    const fetchBoothInfo = async () => {
      try {
        const response = await http.get('/mypages/boothcount/');
        setBoothInfo(response.data);
      } catch (error) {
        setBoothInfo(null);
      }
    };

    fetchBoothInfo();
  }, [loggedIn]);

  return (
    <>
      <FixedHeader>
        <Header />
      </FixedHeader>
      <PageWrapper>
        <UserInfo />
        {loggedIn ? (
          <>
            <ScrapBook />
            {boothInfo ? (
              <MyBoothInfo boothData={boothInfo} />
            ) : (
              <AdminSection />
            )}
          </>
        ) : (
          <LoginBottomSheet
            isOpen={showLoginSheet}
            onClose={() => setShowLoginSheet(false)}
          />
        )}
      </PageWrapper>
    </>
  );
};

export default MyPage;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  max-width: 440px;
  width: 100%;
  z-index: 1000;
  margin: 0 auto;
  background-color: white;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.5rem 1.25rem 3rem;
  background-color: white;
`;
