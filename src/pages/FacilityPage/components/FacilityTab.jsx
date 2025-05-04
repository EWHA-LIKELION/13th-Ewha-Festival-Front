import React from 'react';
import styled from 'styled-components';

const FacilityTab = ({ selected, onTabChange }) => {
  return (
    <TabWrapper>
      <TabButton
        $active={selected === 'facility'}
        onClick={() => onTabChange('facility')}
      >
        쓰레기통&다회용기/부탄가스 수거
      </TabButton>
      <TabButton
        $active={selected === 'barrierFree'}
        onClick={() => onTabChange('barrierFree')}
      >
        배리어프리
      </TabButton>
    </TabWrapper>
  );
};

export default FacilityTab;

const TabWrapper = styled.div`
  display: flex;
  gap: 0.63rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? '#18BB7A' : '#CDCDCD')};
  background: ${({ $active }) => ($active ? '#E8F8F2' : '#fff')};
  color: ${({ $active }) => ($active ? '#18BB7A' : '#787878')};
  border-radius: 1.25rem;
  cursor: pointer;
  ${({ theme }) => theme.fontStyles.regular_14pt};
  padding: 0.5rem 1rem;
`;
