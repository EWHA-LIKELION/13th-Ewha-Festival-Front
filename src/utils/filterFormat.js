// 카테고리 필터
export const formatCategoryFilter = (categories, type) => {
  if (categories.length === 0) return '카테고리';

  // 부스
  if (type === 'booth') {
    if (categories.length === 3) return '전체';
    return categories.join(', ');
  }
  // 공연
  return categories.join(', ');
};

// 위치 필터
export const formatLocationFilter = locations => {
  if (locations.length === 0) return '위치';
  if (locations.length === 1) return locations[0];
  return `${locations[0]} 외 ${locations.length - 1}곳`;
};

// 요일 필터
export const formatDayFilter = days => {
  if (days.length === 0) return '요일';
  return days.join(', ');
};
