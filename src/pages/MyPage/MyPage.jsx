import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import http from '@/api/http';
import Header from '@/common/Header';
import UserInfo from '@/pages/MyPage/components/UserInfo';
import ScrapBook from '@/pages/MyPage/components/ScrapBook';
import AdminSection from '@/pages/MyPage/components/AdminSection';
import MyBoothInfo from '@/pages/MyPage/components/MyBoothInfo';
import useScrapStore from '@/store/useScrapStore';

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useScrapStore();
  const [boothInfo, setBoothInfo] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBoothInfo = async () => {
      try {
        const response = await http.get('/mypages/boothcount/');
        setBoothInfo(response.data);
        console.log(boothInfo);
      } catch (error) {
        setBoothInfo(null);
      }
    };

    fetchBoothInfo();
  }, []);

  return (
    <>
      <Header />
      <PageWrapper>
        <UserInfo />
        <ScrapBook />
        {boothInfo ? <MyBoothInfo boothData={boothInfo} /> : <AdminSection />}
      </PageWrapper>
    </>
  );
};

export default MyPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 1.25rem;
`;
