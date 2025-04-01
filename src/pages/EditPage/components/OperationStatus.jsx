import React from 'react';
import styled from 'styled-components';

const Status = ({ isOpened, setIsOpened }) => {
  return (
    <Container>
      <Title>운영 여부</Title>
      <ButtonContainer>
        <StatusButton active={isOpened} onClick={() => setIsOpened(true)}>
          운영 중
        </StatusButton>
        <StatusButton active={!isOpened} onClick={() => setIsOpened(false)}>
          운영 종료
        </StatusButton>
      </ButtonContainer>
    </Container>
  );
};

export default Status;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
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
