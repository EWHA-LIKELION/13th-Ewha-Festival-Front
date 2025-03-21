import React from 'react';
import styled from 'styled-components';
import ImageEdit from '../components/ImageEdit';
import MenuStatus from '../components/MenuStatus';

const MenuEdit = () => {
  return (
    <EditWrapper>
      <ImageEdit />
      <InputWrapper>
        <Title>메뉴명</Title>
        <Input></Input>
        <Title>가격</Title>
        <section>
          <Input></Input>
          <span>원</span>
        </section>
        <MenuStatus />
      </InputWrapper>
    </EditWrapper>
  );
};

export default MenuEdit;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputWrapper = styled.div`
  padding-inline: 1.5rem;
  section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  span {
    ${({ theme }) => theme.fontStyles.regular_14pt}
  }
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 2rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
const Input = styled.input`
  border-radius: 0.6875rem;
  border: none;
  background: var(--gray1);
  width: 100%;
  height: 2.8125rem;
  padding: 0.75rem 1rem;
  color: var(--gray3);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
