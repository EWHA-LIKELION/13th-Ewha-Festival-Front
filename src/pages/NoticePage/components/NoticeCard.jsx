import React from 'react';
import styled from 'styled-components';
import { ArrowDown, ArrowUp } from '@/assets/icons';

const NoticeCard = ({ notice, expanded, onToggle }) => {
  return (
    <Card $expanded={expanded}>
      <HeaderRow onClick={onToggle}>
        <TitleText $expanded={expanded}>{notice.title}</TitleText>
        {expanded ? <ArrowUp /> : <ArrowDown />}
      </HeaderRow>
      {expanded && <Content>{notice.content}</Content>}
      <FooterRow>
        <Date>{notice.created_date}</Date>
        <Author>축제준비위원회</Author>
      </FooterRow>
    </Card>
  );
};

export default NoticeCard;

const Card = styled.div`
  border: 1px solid var(--green1-50, #8bddbc);
  border-radius: 0.6875rem;
  background: white;
  padding: 1rem 1.25rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

const TitleText = styled.h3`
  ${({ theme }) => theme.fontStyles.medium_14pt};
  color: black;
  flex: 1;

  ${({ $expanded }) =>
    $expanded
      ? `
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    display: block;
  `
      : `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  `}
`;

const Content = styled.p`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: black;
  margin-bottom: 0.5rem;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.span`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: var(--gray3, #787878);
`;

const Author = styled.span`
  ${({ theme }) => theme.fontStyles.light_12pt};
  color: var(--green1-100, #18bb7a);
`;
