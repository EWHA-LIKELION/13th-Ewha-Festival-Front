import { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBooths } from '@/api/booth';

// 부스 무한 스크롤
const useInfiniteBooths = () => {
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ['booths'],
      queryFn: ({ pageParam }) => getBooths({ cursor: pageParam }),
      getNextPageParam: lastPage => {
        if (lastPage.data.booth?.next) {
          const url = new URL(lastPage.data.booth.next);
          return url.searchParams.get('cursor');
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000 // 캐시는 5분 동안
    });

  const lastItemRef = useCallback(
    node => {
      if (isFetching) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, fetchNextPage, hasNextPage]
  );

  const booths = data?.pages.flatMap(page => page.data.booth.results) || [];

  const totalCount = data?.pages[0]?.data.booth_count || 0;

  return {
    booths,
    totalCount,
    lastItemRef,
    isFetching,
    isLoading: status === 'loading'
  };
};

export default useInfiniteBooths;
