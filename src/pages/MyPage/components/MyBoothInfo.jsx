import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminBg from '@/assets/images/myBoothInfo.svg';

const MyBoothInfo = ({ boothData }) => {
  const { booth_name, scrap_count, guestbook_count, is_show, booth_id } =
    boothData;
  const navigate = useNavigate();

  const handleClick = () => {
    if (is_show) {
      navigate(`/showdetail/${booth_id}`);
    } else {
      navigate(`/boothdetail/${booth_id}`);
    }
  };

  const displayScrapCount = scrap_count > 999 ? '999+' : scrap_count;
  const displayGuestbookCount =
    guestbook_count > 999 ? '999+' : guestbook_count;

  return (
    <Container>
      <BackgroundImage src={AdminBg} alt='background' />
      <Content>
        <BoothName>{booth_name}</BoothName>
        <Counts>
          <CountBox>
            <Label>스크랩 수</Label>
            <Value>{displayScrapCount}회</Value>
          </CountBox>
          <CountBox>
            <Label>방명록 수</Label>
            <Value>{displayGuestbookCount}개</Value>
          </CountBox>
        </Counts>
      </Content>
      <GoButton onClick={handleClick}>내 부스 바로가기</GoButton>
    </Container>
  );
};

export default MyBoothInfo;

const Container = styled.div`
  position: relative;
  width: 100%;
  background: var(--red-5, #ffe9e8);
  border-radius: 0.6875rem;
  overflow: hidden;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
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

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.25rem 1.5rem;
`;

const BoothName = styled.div`
  ${({ theme }) => theme.fontStyles.semibold_20pt};
  color: var(--black, #000);
  margin-bottom: 1rem;
`;

const Counts = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const CountBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.regular_14pt};
  margin-bottom: 0.31rem;
`;

const Value = styled.div`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.semibold_20pt};
`;

const GoButton = styled.button`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0.875rem;
  background: var(--red-100, #ff635e);
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.medium_14pt};
  border: none;
  border-radius: 0 0 0.6875rem 0.6875rem;
  cursor: pointer;
`;
