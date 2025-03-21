import React from 'react';
import styled from 'styled-components';
import MenuCard from '@/common/Menu';
import { Plus } from '@/assets/icons';

const MenuEditList = () => {
  return (
    <EditWrapper>
      <Text>수정하고 싶은 메뉴를 선택해주세요.</Text>
      <MenuWrapper>
        <MenuCard />
        <MenuCard />
        <AddMenu>
          <Plus />
        </AddMenu>
      </MenuWrapper>
    </EditWrapper>
  );
};

export default MenuEditList;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.h2`
  padding: 1.5rem;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;
  margin-inline: 1.5rem;
`;

const AddMenu = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6875rem;
  background: var(--green1-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;
