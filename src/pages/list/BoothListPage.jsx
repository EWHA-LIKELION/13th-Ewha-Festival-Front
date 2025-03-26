import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import { Filter } from '@/assets/icons';
import BoothItem from './components/BoothItem';
import useInfiniteBooths from '@/hooks/useInfiniteBooths';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const BoothListContent = () => {
  const { booths, totalCount, lastItemRef } = useInfiniteBooths();

  return (
    <>
      {/* 헤더+필터 */}
      <HeaderWrapper>
        <Header />
        <FilterWrapper>
          <Filter />
          <FilterItem>음식, 굿즈</FilterItem>
          <FilterItem>수, 목, 금</FilterItem>
          <FilterItem>포스코관 외 2곳</FilterItem>
        </FilterWrapper>
      </HeaderWrapper>

      {/* 부스 리스트 */}
      <BoothList>
        <Num>총 {totalCount}개의 부스</Num>

        {booths.map((booth, index) => {
          if (index === booths.length - 1) {
            return (
              <div key={booth.id} ref={lastItemRef}>
                <BoothItem booth={booth} />
              </div>
            );
          }
          return <BoothItem key={booth.id} booth={booth} />;
        })}
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
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0 1.25rem 1.5rem;
`;

const FilterItem = styled.div`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
  border: 1px solid var(--gray3);
  border-radius: 1.25rem;
  padding: 0.5rem 0.65rem;
  white-space: nowrap;
`;

const BoothList = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1rem;
  padding-bottom: 5rem;
`;

const Num = styled.p`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  color: var(--gray3);
`;
