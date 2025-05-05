import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Plus } from '@/assets/icons';
import Notice from './components/Notice';
import AddNotice from './components/AddNotice';
import Header2 from './components/Header2';
import http from '@/api/http';
import getBoothId from '@/api/getBoothId';

const NoticeEdit = () => {
  const [notices, setNotices] = useState([]);
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //const [boothId, setBoothId] = useState(null);
  const boothId = 4;
  const id = 4;
  const fetchNotices = async () => {
    try {
      // const id = await getBoothId();
      // setBoothId(id);
      const res = await http.get(`/notices/${id}/`);
      console.log('📦 서버 응답 데이터:', res.data);

      res.data.forEach((notice, idx) => {
        console.log(`🧾 notice[${idx}] id =`, notice.id);
      });

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
      alert('공지 등록 완료');
      await fetchNotices();
      setTitle('');
      setContent('');
      setIsAddNoticeOpen(false);
    } catch (err) {
      console.error('공지 등록 실패:', err);
      alert('공지 등록 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await http.delete(`/notices/${boothId}/${id}/`);
      setNotices(prev => prev.filter(notice => notice.id !== id));
      alert('삭제되었습니다.');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <EditWrapper>
      <Header2 text='공지' onSubmit={handleSubmit} />
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
            key={notice.id} // ✅ 안정적인 고유값
            title={notice.title}
            content={notice.content}
            createdAt={notice.time_since_created}
            onDelete={() => {
              console.log('삭제 요청 ID:', notice.id);
              handleDelete(notice.id);
            }}
          />
        ))}
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
