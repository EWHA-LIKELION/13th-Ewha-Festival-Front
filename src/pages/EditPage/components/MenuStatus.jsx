import React, { useState } from 'react';
import styled from 'styled-components';

const MenuStatus = () => {
  const [isSelling, setIsSelling] = useState(true);

  return (
    <Wrapper>
      <Title>판매 여부</Title>
      <ButtonGroup>
        <StatusButton active={isSelling} onClick={() => setIsSelling(true)}>
          판매 중
        </StatusButton>
        <StatusButton active={!isSelling} onClick={() => setIsSelling(false)}>
          판매 종료
        </StatusButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default MenuStatus;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-top: 2rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StatusButton = styled.button`
  border-radius: 1.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#E8F8F2' : '#Fff')};
  color: ${({ active }) => (active ? '#18BB7A' : '#CDCDCD')};
  border-color: ${({ active }) => (active ? '#18BB7A' : '#CDCDCD')};
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};
`;
