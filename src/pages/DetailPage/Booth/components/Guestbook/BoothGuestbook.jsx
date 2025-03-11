import React, { useState } from 'react';
import styled from 'styled-components';
import useGuestbookStore from '@/store/guestbookStore';
import GuestbookItem from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookItem';
import GuestbookInputBox from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookInputBox';
import GuestbookDeleteModal from '@/pages/DetailPage/Booth/modals/GuestbookDeleteModal';
import noGuestBookImg from '@/pages/DetailPage/Booth/images/noGuestBook.svg';

const BoothGuestbook = () => {
  const { guestbooks, addGuestbook, deleteGuestbook } = useGuestbookStore();
  const [input, setInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuestbook, setSelectedGuestbook] = useState(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newGuestbook = {
      id: Date.now(),
      username: '익명',
      content: input,
      createdAt: '방금 전',
      isAuthor: true
    };

    addGuestbook(newGuestbook);
    setInput('');

    const textarea = document.getElementById('guestbook-input');
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  const handleDelete = () => {
    if (selectedGuestbook) {
      deleteGuestbook(selectedGuestbook.id);
      setShowDeleteModal(false);
      setSelectedGuestbook(null);
    }
  };

  return (
    <GuestbookContainer hasGuestbooks={guestbooks.length > 0}>
      {guestbooks.length > 0 ? (
        guestbooks.map(gb => (
          <GuestbookItem
            key={gb.id}
            guestbook={gb}
            onDelete={() => {
              setSelectedGuestbook(gb);
              setShowDeleteModal(true);
            }}
          />
        ))
      ) : (
        <NoGuestbook>
          <img src={noGuestBookImg} alt='방명록 없음' />
        </NoGuestbook>
      )}
      <GuestbookInputBox
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
      {showDeleteModal && (
        <GuestbookDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </GuestbookContainer>
  );
};

export default BoothGuestbook;

const GuestbookContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ hasGuestbooks }) =>
    hasGuestbooks ? `padding: 1rem 1.25rem 4.5rem 1.25rem;` : `padding: 0;`}
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const NoGuestbook = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
