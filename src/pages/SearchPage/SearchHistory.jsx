import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cloudBg from '@/assets/images/cloudBg.png';
import { Delete, Balloon } from '@/assets/icons';

const SearchHistory = ({ onSearchClick }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  // 최근 검색어 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // 최근 검색어 삭제하기
  const handleRemoveSearch = (e, search) => {
    e.stopPropagation();
    const updatedSearches = recentSearches.filter(item => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <>
      <HistoryTitle>최근 검색어</HistoryTitle>

      {recentSearches.length === 0 ? (
        <NoHistoryContainer>
          <NoHistoryMessage>최근 검색 내역이 없어요.</NoHistoryMessage>
          <BottomBalloon />
          <BackgroundImage src={cloudBg} />
        </NoHistoryContainer>
      ) : (
        <SearchList>
          {recentSearches.map((search, index) => (
            <SearchItem key={index} onClick={() => onSearchClick(search)}>
              {search}
              <Delete onClick={e => handleRemoveSearch(e, search)} />
            </SearchItem>
          ))}
        </SearchList>
      )}
    </>
  );
};

SearchHistory.propTypes = {
  onSearchClick: PropTypes.func.isRequired
};

export default SearchHistory;

const HistoryTitle = styled.h2`
  ${({ theme }) => theme.fontStyles.semibold_16pt}
  margin: 1.25rem;
`;

const SearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1.25rem;
  gap: 0.75rem;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  gap: 0.31rem;
  border: 1px solid var(--green1-100);
  border-radius: 1.25rem;
  ${({ theme }) => theme.fontStyles.regular_14pt}
  cursor: pointer;
`;

const NoHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoHistoryMessage = styled.p`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  color: var(--gray3);
  text-align: center;
`;

const BottomBalloon = styled(Balloon)`
  position: absolute;
  width: 7rem;
  bottom: 10rem;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
`;
