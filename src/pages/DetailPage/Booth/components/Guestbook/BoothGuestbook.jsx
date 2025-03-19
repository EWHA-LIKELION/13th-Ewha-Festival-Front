import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGuestbookStore, { fetchGuestbooks } from '@/store/guestbookStore';
import GuestbookItem from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookItem';
import GuestbookInputBox from '@/pages/DetailPage/Booth/components/Guestbook/GuestbookInputBox';
import GuestbookDeleteModal from '@/pages/DetailPage/Booth/modals/GuestbookDeleteModal';
import noGuestBookImg from '@/pages/DetailPage/Booth/images/noGuestBook.svg';
import http from '@/api/http';

const BoothGuestbook = () => {
  const { guestbooks, addGuestbook, deleteGuestbook } = useGuestbookStore();
  const [input, setInput] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuestbook, setSelectedGuestbook] = useState(null);
  const boothId = 1; // ✅ 부스 목록 페이지 개발작업 끝나면 수정해주기

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
        alert('로그인 후 이용 가능합니다.');
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
  ${({ $hasGuestbooks }) =>
    $hasGuestbooks ? `padding: 1rem 1.25rem 5.5rem 1.25rem;` : `padding: 0;`}
  gap: 0.75rem;
  margin-bottom: 2rem;
  background-color: white;
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
