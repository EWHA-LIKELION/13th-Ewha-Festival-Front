import { useState } from 'react';
import styled from 'styled-components';

import { CheckedCircle,Circle } from '@/assets/icons';
import popupBg from '@/assets/images/popupBg.png';

const Popup = ({ onClose }) => {
  // 체크박스 로직
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // 하루동안 보지 않기 로직
  const handleClose = () => {
    if (isChecked) {
      const today = new Date();
      localStorage.setItem('popupClosed', today.toDateString());
    }
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupWrapper>
        <PopupContent>
          <PopupText>
            올봄, 자유와 해방의 이름 아래 펼쳐지는
            <br />
            특별한 대동제, 2025 리베르테!
            <br />
            답답했던 일상에서 벗어나
            <br />
            마음껏 웃고, 즐기고, 뛰어놀 수 있는 시간.
            <br />
            <br />
            이화의 캠퍼스가 꿈같은 놀이공원으로 변신합니다.
            <br />
            곳곳에 펼쳐진 공연과 생동감 넘치는 컨텐츠,
            <br />
            다채로운 부스들을 즐겨보세요!
            <br />
            <br />
            모든 규칙과 틀에서 벗어나
            <br />
            진짜 '나'로 돌아가는 순간, 리베르테,
            <br />
            자유를 향한
            <br />
            이화의 가장 찬란한 축제를 시작합니다!
            <ContactInfo>후원 계좌 : 신한 110-562-732840 (김혜진)</ContactInfo>
          </PopupText>
        </PopupContent>

        {/* 닫기 버튼 */}
        <ButtonArea>
          <CheckboxWrapper onClick={toggleCheckbox}>
            {isChecked ? <CheckedCircle /> : <Circle />}
            <p>하루동안 보지 않기</p>
          </CheckboxWrapper>

          <p onClick={handleClose}>닫기</p>
        </ButtonArea>
      </PopupWrapper>
    </PopupOverlay>
  );
};

export default Popup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PopupContent = styled.div`
  width: 100%;
  aspect-ratio: 320/502;
  background-image: url(${popupBg});
  background-color: white;
  background-size: cover;
  border-radius: 0.625rem;
  overflow: hidden;
`;

const PopupText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  ${({ theme }) => theme.fontStyles.regular_14pt};
  text-align: center;
`;

const ContactInfo = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt};
  text-align: center;
  color: var(--green3);
  margin: 1rem 0 4rem;
`;

const ButtonArea = styled.div`
  width: 20rem;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fontStyles.semibold_16pt};
  color: white;
  cursor: pointer;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`;
