import React, { useEffect,useState } from 'react';
import styled from 'styled-components';

import http from '@/api/http';
import noGuestBookImg from '@/assets/images/cloudBg.png';
import LoginBottomSheet from '@/common/LoginBottomSheet';
import GuestbookDeleteModal from '@/pages/DetailPage/shared/GuestbookDeleteModal';
import GuestbookInputBox from '@/pages/DetailPage/Show/components/Guestbook/GuestbookInputBox';
import GuestbookItem from '@/pages/DetailPage/Show/components/Guestbook/GuestbookItem';
import ShowGuestbookStore, {
  fetchGuestbooks
} from '@/store/ShowGuestbookStore';

const BoothGuestbook = ({ boothId }) => {
  const { guestbooks, addGuestbook, deleteGuestbook } = ShowGuestbookStore();
  const [input, setInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuestbook, setSelectedGuestbook] = useState(null);
  const [showLoginSheet, setShowLoginSheet] = useState(false);

  useEffect(() => {
    fetchGuestbooks(boothId);
  }, [boothId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const response = await http.post(`/guestbooks/create/${boothId}/`, {
        content: input
      });

      const newGuestbook = {
        id: response.data.data.guestbook_id,
        username: response.data.data.anonymous_nickname,
        content: response.data.data.content,
        createdAt: response.data.data.created_ago,
        isAuthor: true
      };

      addGuestbook(newGuestbook);
      setInput('');

      fetchGuestbooks(boothId);

      const textarea = document.getElementById('guestbook-input');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setShowLoginSheet(true);
      }
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
    <GuestbookContainer $hasGuestbooks={guestbooks.length > 0}>
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
          <NoGuestbookText>
            등록된 방명록이 없어요.
            <br />첫 방명록을 남겨볼까요?
          </NoGuestbookText>
          <NoGuestbookImage src={noGuestBookImg} alt='방명록 없음' />
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
      <LoginBottomSheet
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
    </GuestbookContainer>
  );
};

export default BoothGuestbook;

const GuestbookContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ $hasGuestbooks }) =>
    $hasGuestbooks ? `padding: 1rem 1.25rem 5.5rem 1.25rem;` : `padding: 0;`}
  gap: 0.75rem;
  margin-bottom: 2rem;
  background-color: white;
`;

const NoGuestbook = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-top: 6.88rem;
  padding-bottom: 5rem;
  min-height: 60vh;
  overflow: hidden;
`;

const NoGuestbookText = styled.p`
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_14pt};
  text-align: center;
  margin-bottom: 1rem;
  z-index: 1;
`;

const NoGuestbookImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 0;
`;
