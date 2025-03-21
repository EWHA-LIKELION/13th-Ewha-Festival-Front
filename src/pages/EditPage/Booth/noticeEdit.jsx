import React from 'react';
import styled from 'styled-components';
import { Plus } from '@/assets/icons';
import Notice from '../components/Notice';
import AddNotice from '../components/AddNotice';

const NoticeEdit = () => {
  return (
    <EditWrapper>
      <AddMenu>
        <Plus />
      </AddMenu>
      <AddNotice />
      <Notice />
    </EditWrapper>
  );
};

export default NoticeEdit;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding-inline: 1.25rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddMenu = styled.div`
  width: 100%;
  height: 3.25rem;
  border-radius: 0.6875rem;
  background: var(--green1-100);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.75rem;
`;
