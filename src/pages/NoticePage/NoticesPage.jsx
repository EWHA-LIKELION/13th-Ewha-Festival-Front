import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import http from '@/api/http';
import { Balloon } from '@/assets/icons';
import cloudBg from '@/assets/images/cloudBg.png';
import Header from '@/common/Header';
import NoticeCard from '@/pages/NoticePage/components/NoticeCard';

const NoticesPage = () => {
  const [openIds, setOpenIds] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await http.get('/notices/tf');
        setNotices(res.data);
      } catch (err) {}
    };

    fetchNotices();
  }, []);

  const toggleExpand = id => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <FixedHeader>
        <Header />
      </FixedHeader>
      <Container $hasNotices={notices.length > 0}>
        <Title>공지사항</Title>
        <Link
          href='https://www.instagram.com/ewha_festa'
          target='_blank'
          rel='noreferrer'
        >
          축준위 인스타 공지 보러가기
        </Link>

        {notices.length === 0 ? (
          <EmptyWrapper>
            <EmptyText>
              등록된 공지가 없어요.
              <br />
              다음에 다시 확인해주세요.
            </EmptyText>
            <StyledBalloon />
            <CloudBackground src={cloudBg} alt='cloud background' />
          </EmptyWrapper>
        ) : (
          <NoticeList>
            {notices.map(notice => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                expanded={openIds.includes(notice.id)}
                onToggle={() => toggleExpand(notice.id)}
              />
            ))}
          </NoticeList>
        )}
      </Container>
    </>
  );
};

export default NoticesPage;

const Container = styled.div`
  background: white;
  padding-top: 4.5rem;
  ${({ $hasNotices }) =>
    $hasNotices &&
    `
      padding: 4.5rem 1.25rem 1.5rem 1.25rem;
    `}
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  max-width: 440px;
  width: 100%;
  z-index: 1000;
  margin: 0 auto;
  background-color: white;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.semibold_24pt};
  color: var(--black, #000);
  text-align: center;
  margin-top: 0.87rem;
  z-index: 1;
`;

const Link = styled.a`
  display: block;
  color: var(--green2-100, #007c4a);
  text-decoration: underline;
  ${({ theme }) => theme.fontStyles.regular_12pt};
  text-align: center;
  z-index: 1;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;
`;

const EmptyText = styled.p`
  position: absolute;
  top: 30%;
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.regular_16pt};
  margin-bottom: 1rem;
`;

const StyledBalloon = styled(Balloon)`
  position: absolute;
  width: 7rem;
  bottom: 10rem;
`;

const CloudBackground = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

const NoticeList = styled.div`
  margin-top: 1.69rem;
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
`;
