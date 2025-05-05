import React, { useEffect } from 'react';
import styled from 'styled-components';

const Introduce = ({ value, onChange, saveTrigger, setIsEdited, isEdited }) => {
  useEffect(() => {
    setIsEdited(false);
  }, [saveTrigger]);

  const handleChange = e => {
    onChange(e);
    setIsEdited(true);
  };

  return (
    <Container>
      <Title>소개글</Title>
      <StyledTextarea
        value={value}
        onChange={handleChange}
        $active={isEdited}
        placeholder='소개를 입력하세요'
        rows={2}
      />
    </Container>
  );
};

export default Introduce;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const StyledTextarea = styled.textarea`
  border-radius: 0.6875rem;
  border: none;
  background: var(--gray1);
  width: 100%;
  padding: 0.75rem 1rem;
  min-height: 5rem;
  resize: vertical;

  color: ${({ $active }) => ($active ? '#000' : 'var(--gray3)')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  ${({ theme }) => theme.fontStyles.regular_16pt}
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
