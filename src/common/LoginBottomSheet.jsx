import { useEffect,useState } from 'react';
import styled, { css } from 'styled-components';

import { getKakaoAuthUrl } from '@/api/auth';
import { ArrowDown,KakaoChat } from '@/assets/icons';
import { fadeIn, fadeOut,slideDown, slideUp } from '@/styles/animations';

const LoginBottomSheet = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthUrl();
  };

  // 애니메이션 처리
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <BottomSheetOverlay onClick={onClose} $isOpen={isOpen}>
      <BottomSheetContent onClick={e => e.stopPropagation()} $isOpen={isOpen}>
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>
          <ArrowDown />
        </CloseButton>

        {/* 안내 문구 */}
        <MessageContent>
          <Title>로그인이 필요한 서비스입니다.</Title>
          <Description>
            웹사이트를 더 편하게 즐기려면
            <br />
            로그인을 해주세요.
          </Description>
        </MessageContent>

        {/* 로그인 버튼 */}
        <LoginButton onClick={handleKakaoLogin}>
          <KakaoChat />
          카카오로 간편 로그인
        </LoginButton>
      </BottomSheetContent>
    </BottomSheetOverlay>
  );
};

export default LoginBottomSheet;

const BottomSheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${fadeIn} 0.3s ease-out forwards
        `
      : css`
          ${fadeOut} 0.3s ease-in forwards
        `};
`;

const BottomSheetContent = styled.div`
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
  gap: 1.5rem;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideUp} 0.3s ease-out forwards
        `
      : css`
          ${slideDown} 0.3s ease-in forwards
        `};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fontStyles.semibold_20pt}
  color: var(--green1-100);
`;

const Description = styled.p`
  ${({ theme }) => theme.fontStyles.regular_16pt}
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.75rem;
  background-color: #ffea2b;
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  margin-bottom: 1rem;
  color: #000;
  gap: 1.25rem;
`;
