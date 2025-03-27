import React from 'react';
import styled from 'styled-components';
import { Trash } from '@/assets/icons';

const Notice = ({ id, title, content, onDelete }) => {
  return (
    <NoticeContainer>
      <Top>
        <Title>{title}</Title>
        <Trash
          stroke='var(--green1-100)'
          onClick={e => {
            e.stopPropagation(); // 카드 클릭 방지
            onDelete?.(id); // 삭제 요청
          }}
        />
      </Top>
      <Content>{content}</Content>
    </NoticeContainer>
  );
};

export default Notice;

const NoticeContainer = styled.div`
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-50);
  padding: 1.25rem;
  margin-bottom: 0.75rem;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
`;
const Title = styled.h2`
  ${({ theme }) => theme.fontStyles.medium_14pt}
`;
const Content = styled.h3`
  ${({ theme }) => theme.fontStyles.light_12pt}
`;
