import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchHistory from './SearchHistory';
import BoothItem from '@/pages/ListPage/components/BoothItem';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { searchResults } from '@/api/search';
import { ArrowLeft, Search, Warning } from '@/assets/icons';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const SearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(searchQuery);
  const [activeTab, setActiveTab] = useState('부스');
  const [searched, setSearched] = useState(!!searchQuery.trim());

  // URL 동기화
  useEffect(() => {
    setInputValue(searchQuery);
    setSearched(!!searchQuery.trim());
  }, [searchQuery]);

  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert('검색어를 입력하세요.');
      return;
    }

    setSearchParams({ q: inputValue });
    document.activeElement.blur();

    // 검색 내역 저장
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [
      inputValue,
      ...searches.filter(s => s !== inputValue)
    ].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // 검색 결과 무한스크롤
  const { data, lastItemRef, error, isLoading } = useInfiniteScroll({
    queryKey: ['search', searchQuery],
    queryFn: ({ pageParam }) =>
      searchResults({ q: searchQuery, cursor: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.data.next) {
        const url = new URL(lastPage.data.next);
        return url.searchParams.get('cursor');
      }
      return undefined;
    },
    enabled: !!searchQuery.trim()
  });

  // 부스•공연 필터링
  const results = data?.pages.flatMap(page => page.data.results || []) || [];
  const filtered = results.filter(
    item =>
      (activeTab === '부스' && !item.is_show) ||
      (activeTab === '공연' && item.is_show)
  );

  const noResults =
    !isLoading &&
    (error?.response?.status === 204 || (searched && results.length === 0));

  return (
    <>
      <TopContainer>
        {/* 검색창 */}
        <SearchBar>
          <ArrowLeft />
          <SearchInputWrapper>
            <SearchInput
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e =>
                e.key === 'Enter' && (handleSearch(), e.target.blur())
              }
              placeholder='검색어를 입력하세요.'
            />
            <SearchIcon onClick={handleSearch} />
          </SearchInputWrapper>
        </SearchBar>

        {/* 탭 */}
        {searched && (
          <TabContainer>
            <TabsWrapper>
              <Tab
                onClick={() => setActiveTab('부스')}
                $isActive={activeTab === '부스'}
              >
                부스
              </Tab>
              <Tab
                onClick={() => setActiveTab('공연')}
                $isActive={activeTab === '공연'}
              >
                공연
              </Tab>
              <Indicator $activeTab={activeTab} />
            </TabsWrapper>
          </TabContainer>
        )}
      </TopContainer>

      {/* 검색 내역 */}
      {!searched ? (
        <SearchHistory
          onSearchClick={search => {
            setInputValue(search);
            setSearchParams({ q: search });
          }}
        />
      ) : (
        <ResultsContainer>
          {noResults ? (
            <NoResultsContainer>
              <Warning />
              <NoResultsText>
                <SearchText>'{searchQuery}'</SearchText>에 대한
                <br />
                검색 결과가 없어요.
              </NoResultsText>
              <Suggestion>
                다른 검색어를 입력하시거나
                <br />
                단어의 철자가 정확한지 확인해보세요.
              </Suggestion>
            </NoResultsContainer>
          ) : (
            <>
              <ListContainer>
                <ResultCount>
                  총 {filtered.length}개의 {activeTab}
                </ResultCount>
                <ItemList>
                  {filtered.map((item, idx) => (
                    <div
                      key={item.id}
                      ref={idx === filtered.length - 1 ? lastItemRef : null}
                    >
                      <BoothItem booth={item} />
                    </div>
                  ))}
                </ItemList>
              </ListContainer>
            </>
          )}
        </ResultsContainer>
      )}
    </>
  );
};

const SearchPage = () => (
  <QueryClientProvider client={queryClient}>
    <SearchContent />
  </QueryClientProvider>
);

export default SearchPage;

const TopContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.88rem 1.25rem 0.44rem;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: var(--gray1);
  border-radius: 0.68rem;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  ${({ theme }) => theme.fontStyles.regular_14pt}
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(Search)`
  stroke: #787878;
`;

const ResultsContainer = styled.div`
  flex: 1;
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

const ResultCount = styled.p`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  color: var(--gray3);
  margin-bottom: 1rem;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 0;
  text-align: center;
`;

const NoResultsText = styled.span`
  ${({ theme }) => theme.fontStyles.regular_20pt}
  margin: 0.75rem;
`;

const SearchText = styled.span`
  ${({ theme }) => theme.fontStyles.semibold_20pt}
  color: var(--red-100);
`;

const Suggestion = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
`;
