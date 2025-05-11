import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import Filter from './components/Filter';
import BoothItem from './components/BoothItem';
import { getBooths } from '@/api/booth';
import useFilter from '@/hooks/useFilter';
import { getFilterOptions } from '@/constants/filterConstants';
import useSaveScroll from '@/hooks/useSaveScroll';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000
    }
  }
});

const BoothListContent = () => {
  // 필터링 + 무한 스크롤
  const {
    items: booths,
    totalCount,
    lastItemRef,
    filters,
    setFilters
  } = useFilter({
    queryKey: ['booths'],
    queryFn: params => getBooths(params),
    getNextPageParam: lastPage => {
      if (lastPage.data.booth?.next) {
        const url = new URL(lastPage.data.booth.next);
        return url.searchParams.get('cursor');
      }
      return undefined;
    },
    getTotalCount: page => page.data.booth_count || 0,
    getItems: page => page.data.booth.results || [],
    type: 'booth'
  });

  useSaveScroll();

  return (
    <>
      {/* 헤더 + 필터 */}
      <HeaderWrapper>
        <Header />
        <Filter
          onFilterChange={setFilters}
          filterOptions={getFilterOptions('booth')}
          type='booth'
          filters={filters}
        />
      </HeaderWrapper>

      {/* 부스 리스트 */}
      <BoothList>
        <Num>총 {totalCount}개의 부스</Num>

        {booths.map((booth, index) => (
          <div
            key={booth.id}
            ref={index === booths.length - 1 ? lastItemRef : null}
          >
            <BoothItem booth={booth} />
          </div>
        ))}
      </BoothList>
      <Footer />
    </>
  );
};

const BoothListPage = () => (
  <QueryClientProvider client={queryClient}>
    <BoothListContent />
  </QueryClientProvider>
);

export default BoothListPage;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-radius: 0 0 1.5625rem 1.5625rem;
  box-shadow: 0 2px 13.1px rgba(0, 0, 0, 0.08);
  max-width: 440px;
  margin: 0 auto;
  width: 100%;
`;

const BoothList = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1rem;
  padding-bottom: 5rem;
  min-height: 100vh;
`;

const Num = styled.p`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  color: var(--gray3);
`;
