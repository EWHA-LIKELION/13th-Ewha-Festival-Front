import React from 'react';
import styled from 'styled-components';
import WarningIcon from '@/assets/icons/Warning';

const Modal = ({ title, onClose, onDelete, modalText }) => {
  return (
    <ModalOverlay>
      <DeleteModal>
        <ModalContent>
          <ModalHeader>
            <WarningIcon /> {title}
          </ModalHeader>
          <ModalText>{modalText}</ModalText>
          <ModalButtons>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <DeleteConfirmButton onClick={onDelete}>삭제</DeleteConfirmButton>
          </ModalButtons>
        </ModalContent>
      </DeleteModal>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DeleteModal = styled.div`
  padding: 1.5rem;
  border-radius: 0.6875rem;
  background: var(--white, #fff);
  z-index: 1001;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.h3`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
  gap: 0.5rem;

  img {
    width: 3rem;
    height: 3rem;
  }
`;

const ModalText = styled.p`
  color: var(--gray3, #787878);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_12pt}
  margin-bottom: 1.25rem;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CancelButton = styled.button`
  width: 8.125rem;
  border-radius: 0.5rem;
  background: var(--gray2, #cdcdcd);
  padding: 0.75rem 0.625rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--black, #000);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const DeleteConfirmButton = styled.button`
  width: 8.125rem;
  border-radius: 0.5rem;
  background: var(--red-100, #ff635e);
  padding: 0.75rem 0.625rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--white, #fff);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
