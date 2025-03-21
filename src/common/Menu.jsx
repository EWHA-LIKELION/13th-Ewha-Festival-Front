import React from 'react';
import styled from 'styled-components';
import { Trash } from '@/assets/icons';

const MenuCard = () => {
  return (
    <MenuItem>
      <MenuImage />
      <MenuGradient />
      <TrashIconWrapper>
        <Trash />
      </TrashIconWrapper>
      <MenuTextWrapper>
        <MenuText>dd</MenuText>
        <MenuPrice>1</MenuPrice>
      </MenuTextWrapper>
    </MenuItem>
  );
};

export default MenuCard;

const MenuItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6875rem;
  overflow: hidden;
`;
const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MenuGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;

  ${({ isBasic }) =>
    !isBasic &&
    `
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
    `}
`;
const TrashIconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 0.75rem;
  z-index: 5;
`;
const MenuTextWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem;
  z-index: 4;
`;

const MenuText = styled.div`
  z-index: 4;
  margin-bottom: 0.31rem;
  color: var(--white, #fff);
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
const MenuPrice = styled.div`
  z-index: 4;
  color: var(--white, #fff);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
