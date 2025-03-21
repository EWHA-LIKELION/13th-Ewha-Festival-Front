import React from 'react';
import styled from 'styled-components';
import { SmallArrow } from '@/assets/icons';

const EditList = () => {
  return (
    <NoticeContainer>
      <List>
        <Title>공지 수정하기</Title>
        <DetailButton>
          5개
          <SmallArrow />
        </DetailButton>
      </List>
      <List>
        <Title>메뉴 수정하기</Title>
        <DetailButton>
          5개
          <SmallArrow />
        </DetailButton>
      </List>
    </NoticeContainer>
  );
};

export default EditList;

const NoticeContainer = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  width: 100%;

  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
const DetailButton = styled.button`
  border-radius: 1.25rem;
  background: var(--gray1);
  min-width: 4.8rem;
  min-height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
const List = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.25rem;
`;
