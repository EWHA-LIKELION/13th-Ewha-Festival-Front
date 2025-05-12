import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import getBoothId from '@/api/getBoothId';
import http from '@/api/http';
import { Plus } from '@/assets/icons';
import Modal from '@/common/Modal';

import AddNotice from './components/AddNotice';
import Header2 from './components/Header2';
import Notice from './components/Notice';

const NoticeEdit = () => {
  const [notices, setNotices] = useState([]);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boothId, setBoothId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDisabledModalOpen, setIsDisabledModalOpen] = useState(false);
  const prevNoticesLengthRef = useRef(null);
  const isButtonActive =
    (title.trim() && content.trim()) ||
    (prevNoticesLengthRef.current !== null &&
      notices.length < prevNoticesLengthRef.current);

  useEffect(() => {
    if (prevNoticesLengthRef.current === null) {
      prevNoticesLengthRef.current = notices.length;
    }
  }, [notices]);

  const fetchNotices = async () => {
    try {
      const id = await getBoothId();
      setBoothId(id);
      const res = await http.get(`/notices/${id}/`);

      setNotices(res.data);
    } catch (err) {
      console.error('공지 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      await http.post(`/notices/${boothId}/`, {
        title,
        content
      });
      await fetchNotices();
      setTitle('');
      setContent('');
      setIsAddNoticeOpen(false);
    } catch (err) {
      console.error('공지 등록 실패:', err);
      alert('공지 등록 중 오류가 발생했습니다.');
    }
  };
  const openDeleteModal = id => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      await http.delete(`/notices/${boothId}/${selectedId}/`);
      setNotices(prev => prev.filter(notice => notice.id !== selectedId));
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <EditWrapper>
      <Header2
        text='공지'
        onSubmit={handleSubmit}
        disabled={!isButtonActive}
        onDisabledClick={() => setIsDisabledModalOpen(true)}
      />
      <AddMenu onClick={() => setIsAddNoticeOpen(true)}>
        <Plus />
      </AddMenu>
      {isAddNoticeOpen && (
        <AddNotice
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
      )}
      {Array.isArray(notices) &&
        notices.map(notice => (
          <Notice
            key={notice.id}
            title={notice.title}
            content={notice.content}
            createdAt={notice.time_since_created}
            onDelete={() => {
              openDeleteModal(notice.id);
            }}
          />
        ))}
      {isModalOpen && (
        <Modal
          title='공지 삭제'
          modalText={
            <>
              공지를 삭제하시겠습니까?
              <br />
              삭제한 공지는 복구되지 않습니다.
            </>
          }
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isDisabledModalOpen && (
        <Modal
          title='공지 등록 불가'
          modalText={
            <>
              제목과 내용을 모두 입력해야
              <br />
              공지를 등록할 수 있습니다.
            </>
          }
          onClose={() => setIsDisabledModalOpen(false)}
          hideDelete={true}
        />
      )}
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
  margin-top: 5rem;
  width: 100%;
  height: 3.25rem;
  border-radius: 0.6875rem;
  background: var(--green1-100);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.75rem;
`;
