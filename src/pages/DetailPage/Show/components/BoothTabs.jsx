import React, { useState } from 'react';
import styled from 'styled-components';

import BoothNotices from '@/pages/DetailPage/Show/components/BoothNotices.jsx';
import BoothGuestbook from '@/pages/DetailPage/Show/components/Guestbook/BoothGuestbook.jsx';

const BoothTabs = () => {
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
          className={$activeTab === '방명록' ? 'active' : ''}
          onClick={() => setActiveTab('방명록')}
        >
          방명록
        </TabButton>
        <TabIndicator $activeTab={$activeTab} />
      </TabsContainer>

      {$activeTab === '공지' && <BoothNotices />}

      {$activeTab === '방명록' && <BoothGuestbook />}
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
`;

const TabButton = styled.button`
  width: 4.25rem;
  color: var(--gray3, #787878);
  align-items: center;
  height: 2.1875rem;

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
      : $activeTab === '방명록'
        ? '4.25rem'
        : '8.5rem'};
  width: 4.25rem;
  height: 3px;
  background-color: #18bb7a;
  transition: left 0.3s ease-in-out;
`;
