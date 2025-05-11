import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import http from '@/api/http';
import { ArrowDown, ArrowUp } from '@/assets/icons';
import Footer from '@/common/Footer';
import Header from '@/common/Header';
import useSaveScroll from '@/hooks/useSaveScroll';
import ShowItem from '@/pages/ListPage/components/ShowItem';

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

const OPEN_CATEGORIES = {
  기획팀: true
};

const CommitteeContent = () => {
  const [openCategories, setOpenCategories] = useState(OPEN_CATEGORIES);
  useSaveScroll();

  // 데이터 가져오기
  const { data: committeeData } = useQuery({
    queryKey: ['committees'],
    queryFn: () => http.get('/committees/').then(res => res.data)
  });

  // 카테고리 토글
  const toggleCategory = categoryName => {
    OPEN_CATEGORIES[categoryName] = !OPEN_CATEGORIES[categoryName];
    setOpenCategories({ ...OPEN_CATEGORIES });
  };

  return (
    <>
      {/* 헤더 */}
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <CommitteeSection>
        {committeeData &&
          Object.entries(committeeData).map(([categoryName, booths]) => (
            <CategoryContainer key={categoryName}>
              {/* 카테고리 이름 */}
              <CategoryHeader
                onClick={() => toggleCategory(categoryName)}
                $isOpen={openCategories[categoryName]}
              >
                <CategoryName>{categoryName} 부스</CategoryName>
                {openCategories[categoryName] ? <ArrowUp /> : <ArrowDown />}
              </CategoryHeader>

              {/* 하위 목록 */}
              {openCategories[categoryName] && booths?.length > 0 && (
                <BoothList>
                  {booths.map(booth => (
                    <ShowItem key={booth.id} show={booth} hideScrap />
                  ))}
                </BoothList>
              )}
            </CategoryContainer>
          ))}
      </CommitteeSection>
      <Footer />
    </>
  );
};

const CommitteePage = () => (
  <QueryClientProvider client={queryClient}>
    <CommitteeContent />
  </QueryClientProvider>
);

export default CommitteePage;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0px 2px 13.1px 0px rgba(0, 0, 0, 0.08);
`;

const CommitteeSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 0.75rem;
  min-height: calc(100vh - 5rem);
  background-color: white;
`;

const CategoryContainer = styled.div``;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const CategoryName = styled.span`
  ${({ theme }) => theme.fontStyles.semibold_20pt}
`;

const BoothList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;
