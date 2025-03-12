import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const handleScrapToggle = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const url = `${process.env.REACT_APP_SERVER_PORT}/scrap/${boothId}/`;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (scrapState) {
        await axios.delete(url, config);
        setScrapState(false);
      } else {
        await axios.post(url, {}, config);
        setScrapState(true);
      }
    } catch (error) {
      console.error('스크랩 요청 중 오류 발생:', error);
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
          <ContactText>{scrapCount}명이 스크랩했어요</ContactText>
        </ButtonItem>
      </ButtonContainer>
    </ButtonWrapper>
  );
};

export default BoothButton;

const ButtonWrapper = styled.div`
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
