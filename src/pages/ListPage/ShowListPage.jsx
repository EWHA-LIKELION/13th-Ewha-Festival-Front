import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import Filter from './components/Filter';
import ShowItem from './components/ShowItem';
import { getShows } from '@/api/show';
import useFilter from '@/hooks/useFilter';
import { getFilterOptions } from '@/constants/filterConstants';
import useSaveScroll from '@/hooks/useSaveScroll';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const ShowListContent = () => {
  // 필터링 + 무한 스크롤
  const {
    items: shows,
    totalCount,
    lastItemRef,
    filters,
    setFilters
  } = useFilter({
    queryKey: ['shows'],
    queryFn: params => getShows(params),
    getNextPageParam: lastPage => {
      if (lastPage.data.booth?.next) {
        const url = new URL(lastPage.data.booth.next);
        return url.searchParams.get('cursor');
      }
      return undefined;
    },
    getTotalCount: page => page.data.booth_count || 0,
    getItems: page => page.data.booth.results || []
  });

  useSaveScroll();

  return (
    <>
      {/* 헤더 + 필터 */}
      <HeaderWrapper>
        <Header />
        <Filter
          onFilterChange={setFilters}
          filterOptions={getFilterOptions('show')}
          type='show'
          filters={filters}
        />
      </HeaderWrapper>

      {/* 공연 리스트 */}
      <ShowList>
        <Num>총 {totalCount}개의 공연</Num>

        {shows.map((show, index) => (
          <div
            key={show.id}
            ref={index === shows.length - 1 ? lastItemRef : null}
          >
            <ShowItem show={show} />
          </div>
        ))}
      </ShowList>
      <Footer />
    </>
  );
};

const ShowListPage = () => (
  <QueryClientProvider client={queryClient}>
    <ShowListContent />
  </QueryClientProvider>
);

export default ShowListPage;

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

const ShowList = styled.div`
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
