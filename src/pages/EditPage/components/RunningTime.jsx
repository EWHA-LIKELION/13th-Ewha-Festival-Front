import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckBox } from '@/assets/icons';

const RunningTime = () => {
  const [schedule, setSchedule] = useState({
    day1: { enabled: false, start: '', end: '' },
    day2: { enabled: false, start: '', end: '' },
    day3: { enabled: false, start: '', end: '' }
  });

  const toggleTimeInputs = day => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  return (
    <TimeContainer>
      <Title>부스 운영시간</Title>
      {Object.entries(schedule).map(([day, data], index) => (
        <ScheduleItem key={day}>
          <CheckboxWrapper onClick={() => toggleTimeInputs(day)}>
            {data.enabled ? <CheckBox /> : <UncheckedBox />}
          </CheckboxWrapper>
          <label>{` ${['수', '목', '금'][index]}요일`}</label>
          <TimeInput
            type='text'
            pattern='[0-9]{2}:[0-9]{2}'
            placeholder='HH:MM'
            value={data.start}
            onChange={e => handleTimeChange(day, 'start', e.target.value)}
            disabled={!data.enabled}
          />
          ~
          <TimeInput
            type='text'
            pattern='[0-9]{2}:[0-9]{2}'
            placeholder='HH:MM'
            value={data.end}
            onChange={e => handleTimeChange(day, 'end', e.target.value)}
            disabled={!data.enabled}
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
  margin-left: 10px;
  width: 4.25rem;
  padding: 0.75rem 1rem;
  border-radius: 0.6875rem;
  background: var(--gray1);
  border: none;
  text-align: center;
  color: var(--gray3);
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
