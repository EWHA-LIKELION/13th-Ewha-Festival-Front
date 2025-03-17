import React, { useState } from 'react';
import styled from 'styled-components';
import http from '@/api/http';

import kakaoIcon from '@/pages/DetailPage/Booth/images/kakao.svg';
import beforescrapIcon from '@/pages/DetailPage/Booth/images/beforescrap.svg';
import afterscrapIcon from '@/pages/DetailPage/Booth/images/afterscrap.svg';

const BoothButton = ({
  contact,
  scrapCount,
  scrapState,
  setScrapState,
  boothId
}) => {
  const [localScrapCount, setLocalScrapCount] = useState(scrapCount);

  const handleScrapToggle = async () => {
    try {
      const url = `/scrap/${boothId}/`;

      if (scrapState) {
        // ✅ API 요청 전에 UI 업데이트하지 않고, 성공 후 업데이트
        await http.delete(url);
        setScrapState(false);
        setLocalScrapCount(prev => prev - 1);
      } else {
        await http.post(url);
        setScrapState(true);
        setLocalScrapCount(prev => prev + 1);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('로그인 후 이용 가능합니다.');
      }
    }
  };

  return (
    <ButtonWrapper>
      <ButtonContainer>
        <ButtonItem>
          <a href={`tel:${contact}`}>
            <img src={kakaoIcon} alt='kakao' />
          </a>
          <ContactText>부스 운영진 연락처</ContactText>
        </ButtonItem>
        <ColumnDivider />
        <ButtonItem>
          <ScrapButton onClick={handleScrapToggle}>
            <img
              src={scrapState ? afterscrapIcon : beforescrapIcon}
              alt='scrap'
            />
          </ScrapButton>
          <ContactText>{localScrapCount}명이 스크랩했어요</ContactText>
        </ButtonItem>
      </ButtonContainer>
    </ButtonWrapper>
  );
};

export default BoothButton;

const ButtonWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.25rem;
  border-top: 1px solid #cdcdcd;
  border-bottom: 1px solid #cdcdcd;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

const ColumnDivider = styled.div`
  width: 1px;
  height: 3rem;
  background-color: #cdcdcd;
`;

const ContactText = styled.div`
  color: var(--gray3, #787878);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_12pt}
`;

const ScrapButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_12pt}
`;
