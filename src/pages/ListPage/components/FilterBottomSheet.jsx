import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BOOTH_FILTER_OPTIONS } from '@/constants/filterConstants';
import { getBoothsCount } from '@/api/booth';
import { ArrowDown } from '@/assets/icons';
import { slideUp, slideDown, fadeIn, fadeOut } from '@/styles/animations';

const FilterBottomSheet = ({ isOpen, onClose, onApply, initialFilters }) => {
  const [filters, setFilters] = useState(
    initialFilters || {
      category: [],
      location: [],
      day_of_week: []
    }
  );
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 필터 부스 개수 가져오기
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await getBoothsCount(filters);
        setCount(response.data.booth_count);
      } catch {
        setCount(0);
      }
    };

    fetchCount();
  }, [filters]);

  // 필터 선택 토글
  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const isSelected = prev[type].includes(value);
      const updatedItems = isSelected
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value];

      // ID 기반 정렬
      const optionIds = {};
      BOOTH_FILTER_OPTIONS[type].forEach(opt => {
        optionIds[opt.name] = opt.id;
      });

      const sortedItems = [...updatedItems].sort(
        (a, b) => (optionIds[a] || 0) - (optionIds[b] || 0)
      );

      return { ...prev, [type]: sortedItems };
    });
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      category: [],
      location: [],
      day_of_week: []
    });
  };

  // 애니메이션 처리
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const hasFilterSet = Object.values(filters).some(arr => arr.length > 0);
  const noResults = hasFilterSet && count === 0;

  return (
    <BottomSheetOverlay onClick={onClose} $isOpen={isOpen}>
      <BottomSheetContent onClick={e => e.stopPropagation()} $isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <ArrowDown />
        </CloseButton>

        {/* 필터 섹션 */}
        {['category', 'location', 'day_of_week'].map(type => (
          <FilterSection key={type}>
            <SectionTitle>
              {type === 'category'
                ? '카테고리'
                : type === 'location'
                  ? '위치'
                  : '요일'}
            </SectionTitle>

            <OptionGroup>
              {BOOTH_FILTER_OPTIONS[type].map(option => (
                <Option
                  key={option.id}
                  $isActive={filters[type].includes(option.name)}
                  onClick={() => toggleFilter(type, option.name)}
                >
                  {option.name}
                </Option>
              ))}
            </OptionGroup>
          </FilterSection>
        ))}

        {/* 버튼들 */}
        <ButtonGroup>
          <ResetButton onClick={resetFilters}>초기화</ResetButton>
          <ApplyButton
            onClick={() => !noResults && onApply(filters)}
            $disabled={noResults}
          >
            {`${count}개의 부스 보기`}
          </ApplyButton>
        </ButtonGroup>
      </BottomSheetContent>
    </BottomSheetOverlay>
  );
};

export default FilterBottomSheet;

const BottomSheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${fadeIn} 0.3s ease-out forwards
        `
      : css`
          ${fadeOut} 0.3s ease-in forwards
        `};
`;

const BottomSheetContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  background: white;
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideUp} 0.3s ease-out forwards
        `
      : css`
          ${slideDown} 0.3s ease-in forwards
        `};
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h3`
  ${({ theme }) => theme.fontStyles.semibold_20pt}
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Option = styled.div`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  cursor: pointer;

  ${({ $isActive }) =>
    $isActive
      ? `
      background-color: var(--green1-10);
      color: var(--green1-100);
      border: 1px solid var(--green1-100);
    `
      : `
      background-color: white;
      color: var(--gray3);
      border: 1px solid var(--gray2);
    `};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ResetButton = styled.button`
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--green1-100);
  border-radius: 0.5rem;
  color: var(--green1-100);
`;

const ApplyButton = styled.button`
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  flex: 3;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: white;
  background: ${({ $disabled }) =>
    $disabled ? 'var(--gray2)' : 'var(--green1-100)'};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;
