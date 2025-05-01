import { useState, useEffect } from 'react';
import { getBoothsCount } from '@/api/booth';

// 목록 필터링 시의 부스 개수 구하는 커스텀 훅
const useCount = (filters, type = 'booth') => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      if (!hasActiveFilters(filters)) {
        return;
      }

      setLoading(true);
      try {
        let response;
        if (type === 'booth') {
          response = await getBoothsCount(filters);
          setCount(response.data.booth_count);
        } else if (type === 'show') {
          response = await getShowsCount(filters);
          setCount(response.data.show_count);
        }
      } catch (err) {
        setError(err);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [filters, type]);

  const hasActiveFilters = filters => {
    return Object.values(filters).some(filterGroup => filterGroup.length > 0);
  };

  return { count, loading, error };
};

export default useCount;
