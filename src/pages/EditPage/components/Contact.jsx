import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Contact = ({ value, onChange, saveTrigger, setIsEdited, isEdited }) => {
  useEffect(() => {
    setIsEdited(false); // 저장되면 다시 회색으로
  }, [saveTrigger]);

  const handleChange = e => {
    onChange(e);
    setIsEdited(true);
  };

  return (
    <Container>
      <Title>운영진 연락처</Title>
      <StyledInput
        value={value}
        onChange={handleChange}
        $active={isEdited}
        placeholder='연락처를 입력하세요'
      />
    </Container>
  );
};

export default Contact;

// 스타일 분리
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const StyledInput = styled.input`
  border-radius: 0.6875rem;
  border: none;
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
