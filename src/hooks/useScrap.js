import { useState } from 'react';
import { isLoggedIn } from '@/api/auth';
import { scrapBooth, unscrapBooth } from '@/api/scrap';
import { useQueryClient } from '@tanstack/react-query';

// 스크랩 기능 커스텀 훅
export const useScrap = (item, setShowLoginSheet = null) => {
  const [isScrap, setIsScrap] = useState(item.is_scrap);
  const [scrapCount, setScrapCount] = useState(item.scrap_count);
  const queryClient = useQueryClient();

  const handleScrap = async e => {
    if (e) {
      e.stopPropagation();
    }

    if (!isLoggedIn()) {
      if (setShowLoginSheet) {
        setShowLoginSheet(true);
      }
      return;
    }

    try {
      const response = await (isScrap
        ? unscrapBooth(item.id)
        : scrapBooth(item.id));
      const newIsScraped = !isScrap;
      setIsScrap(newIsScraped);
      setScrapCount(response.data.scrap_count);

      // 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: ['booths'] });
      queryClient.invalidateQueries({ queryKey: ['shows'] });
      queryClient.invalidateQueries({ queryKey: ['committees'] });
      queryClient.invalidateQueries({ queryKey: ['scraps'] });
    } catch (err) {
      console.error('스크랩 처리 중 오류:', err);
    }
  };

  return { isScrap, scrapCount, handleScrap };
};
