import React from 'react';
import styled from 'styled-components';
import { Send } from '@/assets/icons';

const GuestbookInputBox = ({ input, setInput, onSend }) => {
  const handleInputChange = e => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <InputContainer>
      <InputWrapper>
        <InputField
          id='guestbook-input'
          placeholder='방명록은 익명으로 남겨져요.'
          value={input}
          onChange={handleInputChange}
          rows={1}
        />
        <SendButton onClick={onSend}>
          <Send />
        </SendButton>
      </InputWrapper>
    </InputContainer>
  );
};

export default GuestbookInputBox;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background: var(--white, #fff);
  padding: 0.75rem 1.25rem 1.44rem 1.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 440px;
  margin: 0 auto;
  z-index: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid var(--gray2, #cdcdcd);
  background: var(--gray1, #f2f2f2);
  position: relative;

  ${({ theme }) => theme.fontStyles.light_12pt}

  ::placeholder {
    color: var(--gray3, #787878);
  }
`;

const InputField = styled.textarea`
  flex-grow: 1;
  border: none;
  background: transparent;
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.light_12pt}
  outline: none;
  resize: none;
  overflow-y: hidden;

  padding-right: 3.75rem;
  line-height: normal;
  white-space: pre-wrap;
  color: var(--black, #000);
`;

const SendButton = styled.button`
  position: absolute;
  right: 1.25rem;
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;
