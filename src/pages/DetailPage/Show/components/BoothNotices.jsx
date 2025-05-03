import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownArrow } from '@/pages/DetailPage/Booth/images/down_arrow.svg';
import { ReactComponent as UpArrow } from '@/pages/DetailPage/Booth/images/up_arrow.svg';
import noNoticesImg from '@/assets/images/cloudBg.png';
import http from '@/api/http';

const BoothNotices = ({ boothId }) => {
  const [notices, setNotices] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await http.get(`/shows/notices/${boothId}/`);
        setNotices(response.data.notices || []);
      } catch (error) {}
    };

    fetchNotices();
  }, [boothId]);

  const toggleNotice = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <NoticesContainer $hasNotices={notices.length > 0}>
      {notices.length > 0 ? (
        notices.map((notice, index) => (
          <NoticeCard key={index}>
            <NoticeHeader onClick={() => toggleNotice(index)}>
              <NoticeTitle $expanded={expandedIndex === index}>
                {notice.title}
              </NoticeTitle>
              {expandedIndex === index ? <UpArrow /> : <DownArrow />}
            </NoticeHeader>
            {expandedIndex === index && (
              <NoticeContent>{notice.content}</NoticeContent>
            )}
            <NoticeTime>{notice.formatted_created_at}</NoticeTime>
          </NoticeCard>
        ))
      ) : (
        <NoNotices>
          <NoNoticesText>
            등록된 공지가 없어요.
            <br />
            다음에 다시 확인해주세요.
          </NoNoticesText>
          <NoNoticesImage src={noNoticesImg} alt='공지사항 없음' />
        </NoNotices>
      )}
    </NoticesContainer>
  );
};

export default BoothNotices;

const NoticesContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;

  ${({ $hasNotices }) =>
    $hasNotices
      ? `
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    gap: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
  `
      : `
    padding: 0; 
    justify-content: flex-end;
  `}
`;

const NoticeCard = styled.div`
  display: flex;
  padding: 1rem 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-50, #8bddbc);
  background: var(--white, #fff);
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const NoticeTitle = styled.h3`
  display: -webkit-box;
  width: 17.125rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : '1')};
  overflow: hidden;
  color: var(--black, #000);
  text-overflow: ellipsis;
  ${({ theme }) => theme.fontStyles.medium_14pt}
`;

const NoticeContent = styled.p`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.light_12pt}
`;

const NoticeTime = styled.span`
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.light_12pt}
`;

const NoNotices = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-top: 6.88rem;
  padding-bottom: 5rem;
  min-height: 60vh;
  overflow: hidden;
`;

const NoNoticesText = styled.p`
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_14pt};
  text-align: center;
  margin-bottom: 1rem;
  z-index: 1;
`;

const NoNoticesImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 0;
`;
