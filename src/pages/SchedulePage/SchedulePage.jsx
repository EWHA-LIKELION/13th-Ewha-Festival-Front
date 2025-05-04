import { useState } from 'react';
import styled from 'styled-components';
import lightBg from '@/assets/images/lightBg.png';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import { ArrowLeft, ArrowRight, Day1, Day2, Day3 } from '@/assets/icons';
import { SCHEDULE_DATA } from '@/constants/scheduleConstants';

const DAY_ICONS = {
  1: Day1,
  2: Day2,
  3: Day3
};

const SchedulePage = () => {
  // 날짜 설정
  const [currentDay, setCurrentDay] = useState(1);

  const handlePrevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 3) {
      setCurrentDay(currentDay + 1);
    }
  };

  const DayIcon = DAY_ICONS[currentDay];

  return (
    <MainWrapper>
      <MainContent>
        {/* 헤더 */}
        <Header isMain />

        {/* 일정 내용 */}
        <DateContainer>
          <StyledArrowLeft onClick={handlePrevDay} $visible={currentDay > 1} />
          <DayIcon />
          <StyledArrowRight onClick={handleNextDay} $visible={currentDay < 3} />
        </DateContainer>
        <ScheduleList>
          {SCHEDULE_DATA[currentDay].map((item, index) => (
            <ScheduleItem key={index}>
              <EventTitle>{item.title}</EventTitle>
              <EventTime>{item.time}</EventTime>
            </ScheduleItem>
          ))}
        </ScheduleList>
      </MainContent>
      <Footer />
    </MainWrapper>
  );
};

export default SchedulePage;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  background-image: url(${lightBg});
  background-size: cover;
  height: 100dvh;
  position: relative;
`;

const DateContainer = styled.div`
  display: flex;
  margin: 40% auto 3.88rem;
  height: 3rem;
  width: 14rem;
  align-items: center;
  justify-content: space-between;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  cursor: ${({ $visible }) => ($visible ? 'pointer' : 'default')};
`;

const StyledArrowRight = styled(ArrowRight)`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  cursor: ${({ $visible }) => ($visible ? 'pointer' : 'default')};
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.56rem;
  margin-top: 1rem;
`;

const ScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EventTitle = styled.h2`
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  margin-bottom: 0.25rem;
`;

const EventTime = styled.p`
  ${({ theme }) => theme.fontStyles.semibold_12pt}
  color: var(--green2-100);
`;
