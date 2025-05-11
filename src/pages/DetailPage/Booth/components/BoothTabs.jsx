import React, { useState } from 'react';
import styled from 'styled-components';

import BoothMenu from '@/pages/DetailPage/Booth/components/BoothMenu.jsx';
import BoothNotices from '@/pages/DetailPage/Booth/components/BoothNotices.jsx';
import BoothGuestbook from '@/pages/DetailPage/Booth/components/Guestbook/BoothGuestbook.jsx';

const BoothTabs = ({ boothId }) => {
  const [$activeTab, setActiveTab] = useState('공지');

  return (
    <>
      <TabsContainer>
        <TabButton
          className={$activeTab === '공지' ? 'active' : ''}
          onClick={() => setActiveTab('공지')}
        >
          공지
        </TabButton>
        <TabButton
          className={$activeTab === '메뉴' ? 'active' : ''}
          onClick={() => setActiveTab('메뉴')}
        >
          메뉴
        </TabButton>
        <TabButton
          className={$activeTab === '방명록' ? 'active' : ''}
          onClick={() => setActiveTab('방명록')}
        >
          방명록
        </TabButton>
        <TabIndicator $activeTab={$activeTab} />
      </TabsContainer>

      {$activeTab === '공지' && <BoothNotices boothId={boothId} />}
      {$activeTab === '메뉴' && <BoothMenu boothId={boothId} />}
      {$activeTab === '방명록' && <BoothGuestbook boothId={boothId} />}
    </>
  );
};

export default BoothTabs;

const TabsContainer = styled.div`
  display: flex;
  position: relative;
  border-bottom: 3px solid #f2f2f2;
  width: 100%;
  height: 2.1875rem;
  background-color: white;
`;

const TabButton = styled.button`
  width: 4.25rem;
  color: var(--gray3, #787878);
  align-items: center;
  height: 2.1875rem;
  white-space: nowrap;

  ${({ theme }) => theme.fontStyles.regular_16pt}
  cursor: pointer;

  &.active {
    color: var(--green1-100, #18bb7a);
    ${({ theme }) => theme.fontStyles.semibold_16pt}
  }
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: -3px;
  left: ${({ $activeTab }) =>
    $activeTab === '공지'
      ? '0rem'
      : $activeTab === '메뉴'
        ? '4.25rem'
        : '8.5rem'};
  width: 4.25rem;
  height: 3px;
  background-color: #18bb7a;
  transition: left 0.3s ease-in-out;
`;
