import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { isLoggedIn } from '@/api/auth';
import { scrapBooth, unscrapBooth } from '@/api/scrap';

// 스크랩 기능 커스텀 훅
const scrapCache = {};

export const useScrap = (item, setShowLoginSheet = null) => {
  const cached = scrapCache[item.id] || {};
  const [isScrap, setIsScrap] = useState(cached.isScrap ?? item.is_scrap);
  const [scrapCount, setScrapCount] = useState(
    cached.count ?? item.scrap_count
  );
  const queryClient = useQueryClient();

  const handleScrap = async e => {
    e?.stopPropagation();

    if (!isLoggedIn()) {
      setShowLoginSheet?.(true);
      return;
    }

    try {
      const response = await (isScrap
        ? unscrapBooth(item.id)
        : scrapBooth(item.id));
      const newIsScraped = !isScrap;
      const newCount = response.data.scrap_count;

      setIsScrap(newIsScraped);
      setScrapCount(newCount);

      scrapCache[item.id] = { isScrap: newIsScraped, count: newCount };

      queryClient.invalidateQueries([
        'booths',
        'shows',
        'committees',
        'scraps'
      ]);
      queryClient.refetchQueries(['scraps'], { force: true });
    } catch (err) {
      console.error('스크랩 처리 오류:', err);
    }
  };

  return { isScrap, scrapCount, handleScrap };
};
