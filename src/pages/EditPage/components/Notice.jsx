import React from 'react';
import styled from 'styled-components';
import { Trash } from '@/assets/icons';

const Notice = () => {
  return (
    <NoticeContainer>
      <Top>
        <Title>떡볶이 품절..</Title>
        <Trash stroke='var(--green1-100)' />
      </Top>
      <Content>
        떡볶이 너무 맛있어서 품절임 근데 재입고 예정은 없음 맛있어서 품절임 근데
        재입고 예정은 없음
      </Content>
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
