import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGuestbookStore, { fetchGuestbooks } from '@/store/guestbookStore';
import GuestbookItem from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookItem';
import GuestbookInputBox from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookInputBox';
import GuestbookDeleteModal from '@/pages/DetailPage/Booth/modals/GuestbookDeleteModal';
import noGuestBookImg from '@/pages/DetailPage/Booth/images/noGuestBook.svg';
import axios from 'axios';

const BoothGuestbook = () => {
  const { guestbooks, addGuestbook, deleteGuestbook } = useGuestbookStore();
  const [input, setInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuestbook, setSelectedGuestbook] = useState(null);
  const boothId = 1; // ✅ 실제 사용 시 boothId를 동적으로 받도록 변경 가능

  // 백엔드에서 방명록 데이터 불러오기
  useEffect(() => {
    fetchGuestbooks(boothId);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}guestbooks/create/${boothId}/`,
        { content: input },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      const newGuestbook = {
        id: response.data.data.guestbook_id,
        username: response.data.data.anonymous_nickname,
        content: response.data.data.content,
        createdAt: response.data.data.created_ago,
        isAuthor: true
      };

      addGuestbook(newGuestbook);
      setInput('');

      const textarea = document.getElementById('guestbook-input');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error posting guestbook:', error);
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
