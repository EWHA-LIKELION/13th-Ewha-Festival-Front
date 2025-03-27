import React, { useState, useEffect } from 'react';
import http from '@/api/http';
import styled from 'styled-components';
import { getUserInfo } from '@/api/auth';

import ImageEdit from './components/ImageEdit';
import BoothName from './components/BoothName';
import RunningTime from './components/RunningTime';
import Introduce from './components/BoothIntroduce';
import Contact from './components/Contact';
import Status from './components/OperationStatus';
import EditList from './components/NoticeMenuEditButton';
import Header1 from './components/Header1';

const BoothEdit = () => {
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

  const user = getUserInfo();
  const boothId = 1;

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
        const res = await http.get(`/booths/${boothId}`);
        const booth = res.data.booth;
        const hours = res.data.operating_hours;

        setName(booth.name);
        setDescription(booth.description);
        setContact(booth.contact);
        setIsOpened(booth.is_opened);
        setThumbnailImage(booth.thumbnail);
        setNoticeCount(booth.notice_count);
        setMenuCount(booth.menu_count);

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

    // 확인용 로그
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await http.patch(`/booths/${boothId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message);
    } catch (error) {
      console.error('PATCH 오류:', error);
      alert('수정 실패');
    }
  };

  return (
    <EditWrapper>
      <Header1 buttonText='저장' onClick={onSave} />
      <ImageEdit
        imageSrc={previewUrl}
        onImageChange={e => {
          const file = e.target.files[0];
          if (file) setThumbnailImage(file);
        }}
      />
      <BoothName
        title='부스명'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Introduce
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <RunningTime schedule={schedule} setSchedule={setSchedule} />
      <Contact value={contact} onChange={e => setContact(e.target.value)} />
      <Status isOpened={isOpened} setIsOpened={setIsOpened} />
      <EditList noticeCount={noticeCount} menuCount={menuCount} />
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
