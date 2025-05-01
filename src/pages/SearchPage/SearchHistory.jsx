import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Delete } from '@/assets/icons';

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
    <HistoryContainer>
      <HistoryTitle>최근 검색어</HistoryTitle>

      {recentSearches.length === 0 ? (
        <NoHistoryMessage>최근 검색 내역이 없어요.</NoHistoryMessage>
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
    </HistoryContainer>
  );
};

SearchHistory.propTypes = {
  onSearchClick: PropTypes.func.isRequired
};

export default SearchHistory;

const HistoryContainer = styled.div`
  padding: 1.25rem;
`;

const HistoryTitle = styled.h2`
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  margin-bottom: 0.75rem;
`;

const SearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  gap: 0.31rem;
  border: 1px solid var(--green1-100);
  border-radius: 1.25rem;
  ${({ theme }) => theme.fontStyles.regular_12pt}
  cursor: pointer;
`;

const NoHistoryMessage = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
  text-align: center;
`;
