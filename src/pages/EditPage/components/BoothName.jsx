import React from 'react';
import styled from 'styled-components';

const BoothName = ({ value, onChange }) => {
  return (
    <BoothNameContainer>
      <Title>부스명</Title>
      <input value={value} onChange={onChange} />
    </BoothNameContainer>
  );
};

export default BoothName;

const BoothNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  input {
    border-radius: 0.6875rem;
    border: none;
    background: var(--gray1);
    width: 100%;
    height: 2.8125rem;
    padding: 0.75rem 1rem;
    color: var(--gray3);
    ${({ theme }) => theme.fontStyles.regular_14pt}
  }
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
