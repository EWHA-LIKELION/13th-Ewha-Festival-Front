// 부스 필터 옵션
export const BOOTH_FILTER_OPTIONS = {
  category: [
    { id: 1, name: '음식' },
    { id: 2, name: '굿즈' },
    { id: 3, name: '체험' }
  ],
  location: [
    { id: 1, name: '정문' },
    { id: 2, name: '교육관' },
    { id: 3, name: '대강당' },
    { id: 4, name: '휴웃길' },
    { id: 5, name: '포스코관' },
    { id: 6, name: '학문관' },
    { id: 7, name: '학관' },
    { id: 8, name: '생활관' },
    { id: 9, name: '스포츠트랙' },
    { id: 10, name: '학문관 지하' }
  ],
  day_of_week: [
    { id: 1, name: '수' },
    { id: 2, name: '목' },
    { id: 3, name: '금' }
  ]
};

// 공연 필터 옵션
export const SHOW_FILTER_OPTIONS = {
  category: [
    { id: 1, name: '밴드' },
    { id: 2, name: '댄스' },
    { id: 3, name: '연극' }
  ],
  location: [{ id: 1, name: '학문관광장' }],
  day_of_week: [
    { id: 1, name: '수' },
    { id: 2, name: '목' },
    { id: 3, name: '금' }
  ]
};

export const getFilterOptions = type => {
  return type === 'booth' ? BOOTH_FILTER_OPTIONS : SHOW_FILTER_OPTIONS;
};
