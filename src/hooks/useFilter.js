import { useState, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import { BOOTH_FILTER_OPTIONS } from '@/constants/filterConstants';

// 목록 필터링 커스텀 훅 (무한 스크롤 적용)
const useFilter = ({
  queryKey,
  queryFn,
  getNextPageParam,
  getTotalCount,
  getItems
}) => {
  const [filters, setFilters] = useState({
    category: [],
    location: [],
    day_of_week: []
  });

  const filteredQueryFn = useCallback(
    ({ pageParam }) => {
      const params = { ...filters };
      if (pageParam) params.cursor = pageParam;
      return queryFn(params);
    },
    [filters, queryFn]
  );

  const { data, lastItemRef, isFetching, isLoading, refetch } =
    useInfiniteScroll({
      queryKey: [...queryKey, filters],
      queryFn: filteredQueryFn,
      getNextPageParam
    });

  const handleFilterChange = useCallback(newFilters => {
    const sortedFilters = {};

    Object.entries(newFilters).forEach(([type, items]) => {
      const optionsMap = new Map(
        BOOTH_FILTER_OPTIONS[type].map(option => [option.name, option.id])
      );

      sortedFilters[type] = [...items].sort((a, b) => {
        return (optionsMap.get(a) || 0) - (optionsMap.get(b) || 0);
      });
    });

    setFilters(sortedFilters);
  }, []);

  const items = data?.pages.flatMap(page => getItems(page)) || [];
  const totalCount = data?.pages[0] ? getTotalCount(data.pages[0]) : 0;

  return {
    items,
    totalCount,
    lastItemRef,
    filters,
    setFilters: handleFilterChange,
    isFetching,
    isLoading,
    refetch
  };
};

export default useFilter;
