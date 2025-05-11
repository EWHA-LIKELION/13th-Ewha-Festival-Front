import { useState, useEffect, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import { getFilterOptions } from '@/constants/filterConstants';

// 목록 필터링 커스텀 훅 (무한 스크롤 적용)
const useFilter = ({
  queryKey,
  queryFn,
  getNextPageParam,
  getTotalCount,
  getItems,
  type
}) => {
  const storageKey = `filters_${type}`;

  const getInitialFilters = () => {
    const savedFilters = sessionStorage.getItem(storageKey);
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          category: [],
          location: [],
          day_of_week: []
        };
  };

  const [filters, setFilters] = useState(getInitialFilters());

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters, storageKey]);

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

  const handleFilterChange = useCallback(
    newFilters => {
      const sortedFilters = {};
      const filterOptions = getFilterOptions(type);

      Object.entries(newFilters).forEach(([type, items]) => {
        const optionsMap = new Map(
          filterOptions[type].map(option => [option.name, option.id])
        );

        sortedFilters[type] = [...items].sort((a, b) => {
          return (optionsMap.get(a) || 0) - (optionsMap.get(b) || 0);
        });
      });

      setFilters(sortedFilters);
    },
    [type]
  );

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
