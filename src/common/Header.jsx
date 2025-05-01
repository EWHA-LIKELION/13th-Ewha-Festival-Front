import styled from 'styled-components';
import { Search, Menu } from '@/assets/icons';

const Header = ({ isMain = false }) => {
  return (
    <HeaderWrapper $isMain={isMain}>
      <Logo>로고</Logo>
      <Icons>
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

  ${({ $isMain }) =>
    $isMain &&
    `
    position: fixed;
    top: 0;
    height: 7rem;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
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
`;
