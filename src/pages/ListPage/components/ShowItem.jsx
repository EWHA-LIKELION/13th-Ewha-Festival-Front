import styled from 'styled-components';
import { Scrap } from '@/assets/icons';
import { memo, useState } from 'react';
import { isLoggedIn } from '@/api/auth';
import http from '@/api/http';
import LoginBottomSheet from '@/common/LoginBottomSheet';
import { useNavigate } from 'react-router-dom';

const ShowItem = memo(({ show }) => {
  const {
    id,
    name,
    is_opened,
    category,
    day_of_week = [],
    formatted_location,
    description,
    scrap_count,
    is_scrap,
    images = []
  } = show;

  // 스크랩 기능
  const [isScrap, setIsScrap] = useState(is_scrap);
  const [scrapCount, setScrapCount] = useState(scrap_count);
  const [showLoginSheet, setShowLoginSheet] = useState(false);

  const handleScrap = async () => {
    if (!isLoggedIn()) {
      setShowLoginSheet(true);
      return;
    }

    try {
      const response = await http[isScrap ? 'delete' : 'post'](`/scrap/${id}/`);

      setIsScrap(!isScrap);
      setScrapCount(response.data.scrap_count);
    } catch (err) {
      console.error('스크랩 처리 중 오류:', err);
    }
  };

  // 상세페이지로 이동
  const navigate = useNavigate();
  const handleItemClick = () => {
    navigate(`/showdetail?${id}`);
  };

  // 구분자(·) 넣어서 요일 포맷팅
  const formattedDays = day_of_week.join(' · ');

  return (
    <>
      <ShowWrapper onClick={handleItemClick}>
        <Photo
          style={images[0] ? { backgroundImage: `url(${images[0]})` } : {}}
        />
        <TextBox>
          {/* 제목 */}
          <TitleContainer>
            <Title>{name}</Title>
            {is_opened === false && <ClosedTag>운영 종료</ClosedTag>}
          </TitleContainer>

          {/* 운영 정보 */}
          <Info>
            {category}
            {formattedDays && ` | ${formattedDays}`}
            {formatted_location && ` | ${formatted_location}`}
          </Info>

          {/* 부스 설명 */}
          <Description>"{description}"</Description>
        </TextBox>

        {/* 스크랩 */}
        <ScrapBox>
          <ScrapIcon
            onClick={e => {
              e.stopPropagation();
              handleScrap(e);
            }}
            $isScraped={isScrap}
          />
          <ScrapCount>{scrapCount}</ScrapCount>
        </ScrapBox>
      </ShowWrapper>

      {/* 로그인 바텀시트 */}
      <LoginBottomSheet
        isOpen={showLoginSheet}
        onClose={() => setShowLoginSheet(false)}
      />
    </>
  );
});

ShowItem.displayName = 'ShowItem';

export default ShowItem;

const ShowWrapper = styled.div`
  display: flex;
  padding: 0.75rem;
  border: 1px solid var(--green1-50);
  border-radius: 0.75rem;
  gap: 0.75rem;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.semibold_18pt}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ClosedTag = styled.span`
  ${({ theme }) => theme.fontStyles.semibold_10pt}
  color: white;
  background-color: var(--red-100);
  padding: 0.25rem 0.5rem;
  border-radius: 1.25rem;
  white-space: nowrap;
`;

const Info = styled.h3`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--green2-100);
`;

const ScrapBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: fit-content;
`;

const ScrapIcon = styled(Scrap)`
  path {
    ${({ $isScraped }) =>
      $isScraped ? 'fill: var(--green1-50);' : 'fill: none;'}
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
  height: 2.25rem;
  line-height: 1.125rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ScrapCount = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
`;

const Photo = styled.div`
  width: 5rem;
  height: 5.5rem;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
    180deg,
    rgba(24, 187, 122, 0) -43.75%,
    #18bb7a 104.37%
  );
  border-radius: 0.5rem;
`;
