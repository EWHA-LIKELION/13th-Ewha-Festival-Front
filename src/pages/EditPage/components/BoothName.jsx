import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Error } from '@/assets/icons';

const BoothName = ({
  title,
  value,
  onChange,
  saveTrigger,
  setIsEdited,
  isEdited
}) => {
  const isTooLong = value.length > 13;

  useEffect(() => {
    setIsEdited(false);
  }, [saveTrigger]);

  const handleChange = e => {
    onChange(e);
    setIsEdited(true);
  };

  return (
    <BoothNameContainer>
      <Title>{title}</Title>
      <Input
        value={value}
        onChange={handleChange}
        $active={isEdited}
        $error={isTooLong}
        placeholder='부스명을 입력하세요'
      />
      {isTooLong && (
        <ErrorContainer>
          <Error />
          <ErrorMsg>13자 이내로 작성해주세요.</ErrorMsg>
        </ErrorContainer>
      )}
    </BoothNameContainer>
  );
};

export default BoothName;

const BoothNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const Input = styled.input`
  border-radius: 0.6875rem;
  border: 1px solid
    ${({ $error }) => ($error ? '#FF4D4F' : 'transparent')}!important;
  background: var(--gray1);
  width: 100%;
  height: 2.8125rem;
  padding: 0.75rem 1rem;
  color: ${({ $active }) => ($active ? '#000' : 'var(--gray3)')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const ErrorMsg = styled.span`
  color: #ff0004;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;
`;
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.2rem;
`;
