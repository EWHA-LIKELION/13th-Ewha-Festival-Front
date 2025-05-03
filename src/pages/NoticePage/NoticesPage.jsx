import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import http from '@/api/http';
import Header from '@/common/Header';
import { ArrowDown } from '@/assets/icons';
import { ArrowUp } from '@/assets/icons';
import cloudBg from '@/assets/images/cloudBg.png';
import { Balloon } from '@/assets/icons';

const NoticesPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await http.get('/notices/tf');
        setNotices(res.data.data);
      } catch (err) {}
    };

    fetchNotices();
  }, []);

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Container $hasNotices={notices.length > 0}>
      <Header />
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
            <NoticeCard key={notice.id} $expanded={expandedId === notice.id}>
              <HeaderRow onClick={() => toggleExpand(notice.id)}>
                <TitleText $expanded={expandedId === notice.id}>
                  {notice.title}
                </TitleText>
                {expandedId === notice.id ? <ArrowUp /> : <ArrowDown />}
              </HeaderRow>
              {expandedId === notice.id && <Content>{notice.content}</Content>}
              <FooterRow>
                <Date>{notice.created_date}</Date>
                <Author>축제준비위원회</Author>
              </FooterRow>
            </NoticeCard>
          ))}
        </NoticeList>
      )}
    </Container>
  );
};

export default NoticesPage;

const Container = styled.div`
  background: white;

  ${({ $hasNotices }) =>
    $hasNotices &&
    `
      padding: 1.5rem 1.25rem;
    `}
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

const NoticeCard = styled.div`
  border: 1px solid var(--green1-50, #8bddbc);
  border-radius: 0.6875rem;
  background: white;
  padding: 1rem 1.25rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

const TitleText = styled.h3`
  ${({ theme }) => theme.fontStyles.medium_14pt};
  color: black;
  flex: 1;

  ${({ $expanded }) =>
    $expanded
      ? `
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    display: block;
  `
      : `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  `}
`;

const Content = styled.p`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: black;
  margin-bottom: 0.5rem;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.span`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: var(--gray3, #787878);
`;

const Author = styled.span`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: var(--green1-100, #18bb7a);
`;
