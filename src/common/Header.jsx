import { useState } from 'react';
import styled from 'styled-components';

import { LogoDark, Menu,Search } from '@/assets/icons';

import SideBar from './SideBar';

const Header = ({ isMain = false }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <HeaderWrapper $isMain={isMain}>
        <LogoDark />
        <Icons>
          <Search />
          <Menu onClick={() => setIsSideBarOpen(true)} />
        </Icons>
      </HeaderWrapper>

      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
    </>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;

  ${({ $isMain }) =>
    $isMain &&
    `
    position: fixed;
    top: 0;
    height: 7rem;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  `}
`;

const Icons = styled.div`
  display: flex;
  gap: 0.75rem;
`;
