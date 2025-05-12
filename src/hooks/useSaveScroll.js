import { useEffect } from 'react';

// 스크롤 위치 복원 커스텀 훅
const useSaveScroll = () => {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
      }, 100);
    }
  }, []);
};

export default useSaveScroll;
