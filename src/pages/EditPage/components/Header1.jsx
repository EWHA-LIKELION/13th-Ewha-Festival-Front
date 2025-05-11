import React from 'react';
import styled from 'styled-components';

import { ArrowLeft } from '@/assets/icons';

const Header1 = ({ buttonText = '저장', onClick, onArrowClick }) => {
  return (
    <Wrapper>
      <ArrowLeft onClick={onArrowClick} style={{ cursor: 'pointer' }} />
      <Button onClick={onClick}>{buttonText}</Button>
    </Wrapper>
  );
};

export default Header1;

const Wrapper = styled.div`
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 440px;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 1rem;
`;

const Button = styled.button`
  border-radius: 1.25rem;
  border: 1px solid var(--gray2);
  background: var(--gray1);
  height: 2rem;
  width: 3.5625rem;
`;
