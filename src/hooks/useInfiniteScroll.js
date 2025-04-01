import { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

// 무한 스크롤 커스텀 훅
const useInfiniteScroll = ({
  queryKey,
  queryFn,
  getNextPageParam,
  staleTime = 5 * 60 * 1000,
  select
}) => {
  const observerRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    staleTime,
    select
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

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    status,
    lastItemRef,
    refetch
  };
};

export default useInfiniteScroll;
