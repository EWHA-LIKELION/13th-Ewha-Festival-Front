import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BoothItem from '@/pages/ListPage/components/BoothItem';
import ShowItem from '@/pages/ListPage/components/ShowItem';
import { ArrowLeft, Warning } from '@/assets/icons';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { isLoggedIn } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { getScrapList } from '@/api/scrap';
import LoginBottomSheet from '@/common/LoginBottomSheet';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const ScrapContent = () => {
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [activeTab, setActiveTab] = useState('부스');
  const navigate = useNavigate();

  // 로그인 여부 확인
  useEffect(() => {
    if (!isLoggedIn()) {
      setShowLoginSheet(true);
    }
  }, []);

  // 스크랩 목록
  const { data, lastItemRef, isLoading } = useInfiniteScroll({
    queryKey: ['scraps'],
    queryFn: ({ pageParam }) => getScrapList({ cursor: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.data.next) {
        const url = new URL(lastPage.data.next);
        return url.searchParams.get('cursor');
      }
      return undefined;
    }
  });

  // 현재 탭에 맞는 데이터 가져오기
  const currentData =
    activeTab === '부스'
      ? data?.pages.flatMap(page => page.data.results?.booths || [])
      : data?.pages.flatMap(page => page.data.results?.shows || []);

  // booth 객체만 추출
  const currentItems = currentData?.map(item => item.booth) || [];

  return (
    <>
      <TopContainer>
        {/* 헤더 */}
        <Header>
          <ArrowLeft />
          <Title>스크랩북</Title>
        </Header>

        {/* 탭 */}
        <TabContainer>
          <TabsWrapper>
            <Tab
              $isActive={activeTab === '부스'}
              onClick={() => setActiveTab('부스')}
            >
              부스
            </Tab>
            <Tab
              $isActive={activeTab === '공연'}
              onClick={() => setActiveTab('공연')}
            >
              공연
            </Tab>
            <Indicator $activeTab={activeTab} />
          </TabsWrapper>
        </TabContainer>
      </TopContainer>

      {/* 스크랩 목록 */}
      <ListContainer>
        {!isLoading && currentItems.length === 0 ? (
          <NoScrapContainer>
            <Warning />
            <NoScrapText>
              아직 스크랩한 내용이
              <br />
              없어요.
            </NoScrapText>
            <Suggestion
              onClick={() =>
                navigate(`/${activeTab === '부스' ? 'boothlist' : 'showlist'}`)
              }
            >
              스크랩 하러 가기
            </Suggestion>
          </NoScrapContainer>
        ) : (
          <ItemList>
            <ScrapCount>
              총 {currentItems.length}개의 {activeTab}
            </ScrapCount>
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                ref={index === currentItems.length - 1 ? lastItemRef : null}
              >
                {activeTab === '부스' ? (
                  <BoothItem booth={item} />
                ) : (
                  <ShowItem show={item} />
                )}
              </div>
            ))}
          </ItemList>
        )}
      </ListContainer>

      {/* 로그인 바텀시트 */}
      <LoginBottomSheet
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
    </>
  );
};

const ScrapPage = () => (
  <QueryClientProvider client={queryClient}>
    <ScrapContent />
  </QueryClientProvider>
);

export default ScrapPage;

const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  gap: 0.75rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.regular_20pt}
`;

const TabContainer = styled.div`
  border-bottom: 0.2rem solid var(--gray1);
`;

const TabsWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Tab = styled.div`
  ${({ theme, $isActive }) =>
    $isActive ? theme.fontStyles.semibold_16pt : theme.fontStyles.regular_16pt};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--green1-100)' : 'var(--gray3)'};
  padding: 0.63rem 1.25rem 0.5rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  width: 4.25rem;
  z-index: 1;
`;

const Indicator = styled.div`
  position: absolute;
  height: 0.2rem;
  width: 4.25rem;
  background-color: var(--green1-100);
  bottom: -0.2rem;
  transition: transform 0.3s ease;
  z-index: 2;
  transform: translateX(
    ${({ $activeTab }) => ($activeTab === '부스' ? '0%' : '100%')}
  );
`;

const ListContainer = styled.div`
  padding: 1.25rem;
  background-color: white;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ScrapCount = styled.p`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  color: var(--gray3);
  margin-bottom: 0.25rem;
`;

const NoScrapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6.25rem 0;
  text-align: center;
  gap: 0.75rem;
`;

const NoScrapText = styled.span`
  ${({ theme }) => theme.fontStyles.regular_20pt}
  text-align: center;
`;

const Suggestion = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
  cursor: pointer;
  text-decoration: underline;
`;
