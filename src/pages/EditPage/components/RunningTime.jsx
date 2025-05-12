import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CheckBox } from '@/assets/icons';

const RunningTime = ({ schedule, setSchedule, saveTrigger, setIsEdited }) => {
  const [edited, setEdited] = useState({
    day1: { start: false, end: false },
    day2: { start: false, end: false },
    day3: { start: false, end: false }
  });

  useEffect(() => {
    setEdited({
      day1: { start: false, end: false },
      day2: { start: false, end: false },
      day3: { start: false, end: false }
    });
    setIsEdited(false); // 저장됨
  }, [saveTrigger]);

  const toggleTimeInputs = day => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
    setIsEdited(true); // 수정됨
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));

    setEdited(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: true }
    }));

    setIsEdited(true); // 수정됨
  };

  return (
    <TimeContainer>
      <Title>운영시간</Title>
      {Object.entries(schedule).map(([day, data], index) => (
        <ScheduleItem key={day}>
          <CheckboxWrapper onClick={() => toggleTimeInputs(day)}>
            {data.enabled ? <CheckBox /> : <UncheckedBox />}
          </CheckboxWrapper>
          <label>{` ${['수', '목', '금'][index]}요일`}</label>
          <TimeInput
            type='text'
            placeholder='00:00'
            value={data.start}
            onChange={e => handleTimeChange(day, 'start', e.target.value)}
            disabled={!data.enabled}
            $active={edited[day].start}
          />
          ~
          <TimeInput
            type='text'
            placeholder='00:00'
            value={data.end}
            onChange={e => handleTimeChange(day, 'end', e.target.value)}
            disabled={!data.enabled}
            $active={edited[day].end}
          />
        </ScheduleItem>
      ))}
    </TimeContainer>
  );
};

export default RunningTime;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const TimeInput = styled.input`
  margin-inline: 0.75rem;
  width: 4.25rem;
  padding: 0.75rem 1rem;
  border-radius: 0.6875rem;
  background: var(--gray1);
  border: none;
  text-align: center;

  color: ${({ $active }) => ($active ? '#000' : 'var(--gray3)')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    ${({ theme }) => theme.fontStyles.regular_14pt}
  }
`;

const CheckboxWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3125rem;
  margin-right: 0.75rem;
  background: var(--gray1, #f2f2f2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3125rem;
  background: var(--gray1, #f2f2f2);
`;
