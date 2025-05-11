import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import getBoothId from '@/api/getBoothId';
import http from '@/api/http';
import Modal from '@/common/Modal';

import Introduce from './components/BoothIntroduce';
import BoothName from './components/BoothName';
import Contact from './components/Contact';
import Header1 from './components/Header1';
import ImageEdit from './components/ImageEdit';
import EditList from './components/NoticeMenuEditButton';
import Status from './components/OperationStatus';
import RunningTime from './components/RunningTime';

const BoothEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isOpened, setIsOpened] = useState(true);
  const [schedule, setSchedule] = useState({
    day1: { enabled: false, start: '', end: '' }, // 수요일
    day2: { enabled: false, start: '', end: '' }, // 목요일
    day3: { enabled: false, start: '', end: '' } // 금요일
  });
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [noticeCount, setNoticeCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [boothId, setBoothId] = useState(null);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArrowClick = () => {
    if (isEdited) {
      setIsModalOpen(true); // 변경사항 있으면 모달 띄움
    } else {
      navigate(-1); // 변경사항 없으면 바로 뒤로감
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getOperatingHoursForAPI = () => {
    const mapping = {
      day1: { date: 14, day_of_week: '수요일' },
      day2: { date: 15, day_of_week: '목요일' },
      day3: { date: 16, day_of_week: '금요일' }
    };

    return Object.entries(schedule)
      .filter(([_, data]) => data.enabled)
      .map(([key, data]) => ({
        date: mapping[key].date,
        day_of_week: mapping[key].day_of_week,
        open_time: data.start,
        close_time: data.end
      }));
  };

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const id = await getBoothId();
        setBoothId(id);

        const res = await http.get(`/booths/${id}`);
        const booth = res.data.booth;
        const hours = res.data.operating_hours;

        setName(booth.name);
        setDescription(booth.description);
        setContact(booth.contact);
        setIsOpened(booth.is_opened);
        setThumbnailImage(booth.thumbnail);
        setNoticeCount(booth.notice_count);
        setMenuCount(booth.menu_count);
        setBoothId(id);

        const newSchedule = { ...schedule };

        hours.forEach(item => {
          const key =
            item.date === 14 ? 'day1' : item.date === 15 ? 'day2' : 'day3';

          newSchedule[key] = {
            enabled: true,
            start: item.open_time,
            end: item.close_time
          };
        });

        setSchedule(newSchedule);
      } catch (err) {
        alert('부스 정보를 불러오지 못했습니다.');
      }
    };

    fetchBoothData();
  }, [boothId]);

  useEffect(() => {
    if (!thumbnailImage) {
      setPreviewUrl(null);
      return;
    }

    if (typeof thumbnailImage === 'string') {
      setPreviewUrl(thumbnailImage);
    } else {
      const url = URL.createObjectURL(thumbnailImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailImage]);

  const onSave = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('contact', contact);
    formData.append('is_opened', isOpened);
    formData.append(
      'operating_hours',
      JSON.stringify(getOperatingHoursForAPI())
    );

    if (thumbnailImage && typeof thumbnailImage !== 'string') {
      formData.append('thumbnail_image', thumbnailImage);
    }

    setSaveTrigger(prev => prev + 1);
    try {
      const response = await http.patch(`/booths/${boothId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      alert('수정 실패');
    }
  };

  return (
    <EditWrapper>
      <Header1
        buttonText='저장'
        onClick={onSave}
        onArrowClick={handleArrowClick}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <ImageEdit
        imageSrc={previewUrl}
        onImageChange={e => {
          const file = e.target.files[0];
          if (file) setThumbnailImage(file);
        }}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <BoothName
        title='부스명'
        value={name}
        onChange={e => setName(e.target.value)}
        saveTrigger={saveTrigger}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <Introduce
        value={description}
        onChange={e => setDescription(e.target.value)}
        saveTrigger={saveTrigger}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <RunningTime
        saveTrigger={saveTrigger}
        schedule={schedule}
        setSchedule={setSchedule}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <Contact
        value={contact}
        onChange={e => setContact(e.target.value)}
        saveTrigger={saveTrigger}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <Status
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      <EditList noticeCount={noticeCount} menuCount={menuCount} />
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onDelete={() => {
            setIsModalOpen(false);
            navigate(-1);
          }}
          title='변경사항 폐기'
          modalText={
            <>
              변경사항을 폐기하시겠습니까?
              <br />
              변경사항은 복구되지 않습니다.
            </>
          }
        />
      )}
    </EditWrapper>
  );
};

export default BoothEdit;

const EditWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
