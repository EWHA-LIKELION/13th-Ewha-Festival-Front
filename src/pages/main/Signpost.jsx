import styled from 'styled-components';
import { Pole } from '@/assets/icons';
import Sign from './Sign';
import { getUserInfo } from '@/api/auth';

const allSigns = [
  { korean: '부스 목록', english: 'Booth\nList' },
  { korean: '공연 목록', english: 'Stage\nList' },
  { korean: '축제 일정', english: 'Liberté\nPlan' },
  { korean: '스크랩북', english: 'Scrap\nBook' },
  { korean: '부스 관리', english: 'Booth\nAdmin' }
];

const Signpost = () => {
  const userInfo = getUserInfo();
  const isBooth = userInfo?.is_booth || false;
  const signs = isBooth ? allSigns : allSigns.slice(0, 4);

  return (
    <SignpostWrapper>
      <Pole />
      {signs.map((sign, index) => (
        <SignWrapper key={index} index={index} isLeft={index % 2 === 0}>
          <Sign
            korean={sign.korean}
            english={sign.english}
            left={index % 2 === 1}
          />
        </SignWrapper>
      ))}
    </SignpostWrapper>
  );
};

export default Signpost;

const SignpostWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;

const SignWrapper = styled.div`
  position: absolute;
  top: ${({ index }) => 10 + index * 16}%;
  z-index: 3;

  ${({ isLeft }) =>
    isLeft
      ? 'right: 85%; transform: translateX(100%);'
      : 'left: 85%; transform: translateX(-100%);'}
`;
