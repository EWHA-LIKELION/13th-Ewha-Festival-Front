import { ArrowLeft } from '@/assets/icons';
import React from 'react';
import styled from 'styled-components';

const Header2 = ({ onClick, text = '메뉴', onSubmit, disabled }) => {
  const handleButtonClick = () => {
    if (disabled) return;
    if (onSubmit) onSubmit();
    else if (onClick) onClick();
  };

  return (
    <Wrapper>
      <Container>
        <ArrowLeft />
        <Title>{text} 수정하기</Title>
      </Container>
      <Button disabled={disabled} onClick={handleButtonClick}>
        완료
      </Button>
    </Wrapper>
  );
};

export default Header2;

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 100%;
  max-width: 440px;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 1rem;
`;
const Title = styled.h2`
  ${({ theme }) => theme.fontStyles.regular_20pt}
`;
const Button = styled.button`
  border-radius: 1.25rem;
  border: 1px solid var(--gray2);
  background: var(--gray1);
  height: 2rem;
  width: 3.5625rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Container = styled.div`
  display: flex;
`;
