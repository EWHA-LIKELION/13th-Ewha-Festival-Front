import styled from 'styled-components';
import { Search, Menu } from '@/assets/icons';

const Header = ({ isDark = false }) => {
  return (
    <HeaderWrapper $isDark={isDark}>
      <Logo>로고</Logo>
      <Icons $isDark={isDark}>
        <Search />
        <Menu />
      </Icons>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 440px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 1.25rem;
  z-index: 10;

  ${({ $isDark }) =>
    $isDark &&
    `
    position: fixed;
    top: 0;
    height: 7rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  `}
`;

const Logo = styled.div`
  width: 4.5rem;
  height: 2.25rem;
  background-color: #d7d7d7;
  display: grid;
  place-items: center;
`;

const Icons = styled.div`
  display: flex;
  gap: 0.75rem;

  svg {
    stroke: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#000000')};
  }
`;
