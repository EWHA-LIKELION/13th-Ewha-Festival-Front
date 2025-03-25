import React, { useState } from 'react';
import styled from 'styled-components';
import ImageEdit from '../components/ImageEdit';
import BoothName from '../components/BoothName';
import RunningTime from '../components/RunningTime';
import Introduce from '../components/BoothIntroduce';
import Contact from '../components/Contact';
import Status from '../components/OperationStatus';
import EditList from '../components/NoticeMenuEditButton';
import Header1 from '../components/Header1';
import patch from '@/api/patch';

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

  const getOperatingHoursForAPI = () => {
    const mapping = {
      day1: { date: 10, day_of_week: '수요일' },
      day2: { date: 11, day_of_week: '목요일' },
      day3: { date: 12, day_of_week: '금요일' }
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
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const boothId = 1; // 예시

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    const data = {
      name,
      description,
      contact,
      is_opened: isOpened,
      operating_hours: getOperatingHoursForAPI(),
      thumbnail_image: thumbnailImage
    };

    try {
      const response = await patch(boothId, data, token);
      alert(response.message);
    } catch (error) {
      alert('수정 실패');
    }
  };

  return (
    <EditWrapper>
      <Header1 onSave={handleSubmit} />
      <ImageEdit
        thumbnailImage={thumbnailImage}
        onImageChange={setThumbnailImage}
      />
      <BoothName value={name} onChange={e => setName(e.target.value)} />
      <Introduce
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <RunningTime schedule={schedule} setSchedule={setSchedule} />
      <Contact value={contact} onChange={e => setContact(e.target.value)} />
      <Status isOpened={isOpened} setIsOpened={setIsOpened} />
      <EditList />
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
