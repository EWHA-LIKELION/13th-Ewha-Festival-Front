import styled from 'styled-components';
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import committeeBanner from '@/assets/images/committeeBanner.png';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import ShowItem from '@/pages/ListPage/components/ShowItem';
import http from '@/api/http';
import { ArrowDown, ArrowUp } from '@/assets/icons';

// tanstack query 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const CommitteeContent = () => {
  const [openCategories, setOpenCategories] = useState({});

  // 데이터 가져오기
  const { data: committeeData } = useQuery({
    queryKey: ['committees'],
    queryFn: () => http.get('/committees/').then(res => res.data),
    staleTime: 0
  });

  // 카테고리 토글
  const toggleCategory = categoryName => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <>
      {/* 헤더 */}
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <CommitteeSection>
        {/* 배너 */}
        <Banner
          onClick={() =>
            window.open(process.env.REACT_APP_COMMITTEE_URL, '_blank')
          }
        />

        {committeeData &&
          Object.entries(committeeData).map(([categoryName, booths]) => (
            <CategoryContainer key={categoryName}>
              {/* 카테고리 이름 */}
              <CategoryHeader
                onClick={() => toggleCategory(categoryName)}
                $isOpen={openCategories[categoryName]}
              >
                <CategoryName>{categoryName}팀 부스</CategoryName>
                {openCategories[categoryName] ? <ArrowUp /> : <ArrowDown />}
              </CategoryHeader>

              {/* 하위 목록 */}
              {openCategories[categoryName] && booths?.length > 0 && (
                <BoothList>
                  {booths.map(booth => (
                    <ShowItem key={booth.id} show={booth} />
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

const Banner = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 0.5rem;
  background-image: url(${committeeBanner});
  background-size: cover;
  margin-bottom: 1.5rem;
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
