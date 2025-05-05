import React from 'react';
import styled from 'styled-components';
import { Garbage } from '@/assets/icons';

const GuestbookItem = ({ guestbook, onDelete }) => {
  return (
    <ItemContainer>
      <Header>
        <Username>{guestbook.username}</Username>
        {guestbook.isAuthor && (
          <DeleteButton onClick={onDelete}>
            <Garbage />
          </DeleteButton>
        )}
      </Header>
      <Content>{guestbook.content}</Content>
      <Time>{guestbook.createdAt}</Time>
    </ItemContainer>
  );
};

export default GuestbookItem;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1.25rem;
  gap: 0.5rem;
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-50, #8bddbc);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.div`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.medium_14pt}
`;

const Content = styled.p`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.light_12pt}
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Time = styled.span`
  align-self: stretch;
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.light_12pt}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 1.25rem;
  height: 1.25rem;
`;
