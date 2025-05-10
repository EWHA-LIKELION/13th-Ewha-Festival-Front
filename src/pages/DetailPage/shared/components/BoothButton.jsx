import React, { useState } from 'react';
import styled from 'styled-components';
import { Scrap, Kakao } from '@/assets/icons';
import { useScrap } from '@/hooks/useScrap';
import LoginBottomSheet from '@/common/LoginBottomSheet';

const BoothButton = ({
  contact,
  boothId,
  scrapCount,
  scrapState,
  setScrapState,
  isCommittee,
  isShow
}) => {
  const [showLoginSheet, setShowLoginSheet] = useState(false);

  const {
    isScrap,
    scrapCount: localScrapCount,
    handleScrap
  } = useScrap(
    {
      id: boothId,
      is_scrap: scrapState,
      scrap_count: scrapCount
    },
    setShowLoginSheet,
    setScrapState
  );

  return (
    <>
      <ButtonWrapper>
        <ButtonContainer>
          <ButtonItem>
            <a href={contact} target='_blank' rel='noopener noreferrer'>
              <KakaoIcon />
            </a>
            <ContactText>
              {isCommittee
                ? '축준위 연락처'
                : isShow
                  ? '공연 운영진 연락처'
                  : '부스 운영진 연락처'}
            </ContactText>
          </ButtonItem>
          {!isCommittee && (
            <>
              <ColumnDivider />
              <ButtonItem>
                <ScrapButton as='div'>
                  <ScrapIcon onClick={handleScrap} $isScraped={isScrap} />
                </ScrapButton>
                <ContactText>{localScrapCount}명이 스크랩했어요</ContactText>
              </ButtonItem>
            </>
          )}
        </ButtonContainer>
      </ButtonWrapper>

      <LoginBottomSheet
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
    </>
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
  gap: 0.3rem;
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

const ScrapIcon = styled(Scrap)`
  path {
    ${({ $isScraped }) =>
      $isScraped ? 'fill: var(--green1-50);' : 'fill: none;'}
  }
  cursor: pointer;
`;

const KakaoIcon = styled(Kakao)`
  width: 1.5rem;
  height: 1.5rem;
  display: block;
`;
