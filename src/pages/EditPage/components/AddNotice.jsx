import React from 'react';
import styled from 'styled-components';

const AddNotice = ({ title, content, setTitle, setContent, onSubmit }) => {
  return (
    <NoticeContainer>
      <TitleInput
        placeholder='공지 제목을 입력해주세요.'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Divider />
      <ContentInput
        placeholder='공지 내용을 입력해주세요.'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
    </NoticeContainer>
  );
};

export default AddNotice;

const NoticeContainer = styled.div`
  border-radius: 0.6875rem;
  background: var(--gray1);
  margin-bottom: 0.75rem;
`;
const TitleInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: var(--gray3);
  outline: none;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
  padding:1rem 1.25rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.0625rem;
  background: #cdcdcd;
`;

const ContentInput = styled.textarea`
  width: 100%;
  border: none;
  background: transparent;
  color: var(--gray3);
  outline: none;
  ${({ theme }) => theme.fontStyles.light_12pt}
  padding:0.5rem 1.25rem;
`;
