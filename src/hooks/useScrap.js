import { useState } from 'react';
import { isLoggedIn } from '@/api/auth';
import { scrapBooth, unscrapBooth } from '@/api/scrap';
import { useQueryClient } from '@tanstack/react-query';

export const useScrap = (item, setShowLoginSheet = null) => {
  const [isScrap, setIsScrap] = useState(item.is_scrap);
  const [scrapCount, setScrapCount] = useState(item.scrap_count);
  const queryClient = useQueryClient();

  const handleScrap = async e => {
    if (e) {
      e.stopPropagation();
    }

    if (!isLoggedIn()) {
      setShowLoginSheet(true);
      return;
    }

    try {
      const response = await (isScrap
        ? unscrapBooth(item.id)
        : scrapBooth(item.id));
      const newIsScraped = !isScrap;
      setIsScrap(newIsScraped);
      setScrapCount(response.data.scrap_count);

      // 스크랩 페이지 갱신
      const currentPath = window.location.pathname;
      if (currentPath.includes('/scrap') && !newIsScraped) {
        queryClient.setQueryData(['scraps'], oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                booths:
                  page.data.booths?.filter(booth => booth.id !== item.id) || [],
                shows:
                  page.data.shows?.filter(show => show.id !== item.id) || []
              }
            }))
          };
        });
      }
    } catch (err) {
      console.error('스크랩 처리 중 오류:', err);
    }
  };

  return { isScrap, scrapCount, handleScrap };
};
