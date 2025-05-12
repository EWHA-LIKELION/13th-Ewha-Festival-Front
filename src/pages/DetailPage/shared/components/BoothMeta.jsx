import React from 'react';
import styled from 'styled-components';

const BoothMeta = ({ location, operatingHours }) => {
  return (
    <BoothMetaWrapper>
      <MetaRow>
        <MetaLabel>위치</MetaLabel>
        <MetaContent>{location}</MetaContent>
      </MetaRow>
      <MetaRow>
        <MetaLabel>운영 시간</MetaLabel>
        <MetaContent>
          <ul>
            {operatingHours && operatingHours.length > 0 ? (
              operatingHours.map((hour, index) => <li key={index}>{hour}</li>)
            ) : (
              <li>운영 시간 정보 없음</li>
            )}
          </ul>
        </MetaContent>
      </MetaRow>
    </BoothMetaWrapper>
  );
};

export default BoothMeta;

const BoothMetaWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: white;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MetaLabel = styled.div`
  width: 2.8125rem;
  color: var(--black, #000);
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.00625rem;

  margin-right: 0.75rem;
`;

const MetaContent = styled.div`
  color: var(--black, #000);

  ${({ theme }) => theme.fontStyles.regular_12pt}
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin: 0;
  }
`;
