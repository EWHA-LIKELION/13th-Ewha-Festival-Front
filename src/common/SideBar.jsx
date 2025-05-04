import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Balloon } from '@/assets/icons';
import cloudBg from '@/assets/images/cloudBg.png';
import { isLoggedIn, handleLogout } from '@/api/auth';

const SideBar = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  // 각 페이지 데이터
  const menuItems = [
    {
      id: 'booth',
      label: '부스 목록',
      children: [
        { label: '학생 운영 부스', path: '/boothlist' },
        { label: '축준위 운영 및 프로모션 부스', path: '/committee' },
        { label: '플리마켓', path: '/fleamarket' }
      ]
    },
    { id: 'show', label: '공연 목록', path: '/showlist' },
    { id: 'schedule', label: '축제 일정', path: '/schedule' },
    { id: 'facility', label: '주요 시설', path: '/facility' },
    { id: 'notice', label: '공지사항', path: '/notice' },
    { id: 'mypage', label: '마이페이지', path: '/mypage' }
  ];

  const handleMenuClick = item => {
    if (item.children) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      navigate(item.path);
      onClose();
    }
  };

  const handleChildClick = path => {
    navigate(path);
    onClose();
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/', { replace: true, state: { shouldRefresh: true } });
    onClose();
  };

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <Container $isOpen={isOpen} onClick={e => e.stopPropagation()}>
        <ArrowLeft onClick={onClose} style={{ margin: '1.25rem' }} />

        {/* 페이지 리스트 */}
        <MenuList>
          {menuItems.map(item => (
            <div key={item.id}>
              <MenuItem onClick={() => handleMenuClick(item)}>
                {item.label}
              </MenuItem>

              {item.children && expandedMenu === item.id && (
                <SubMenuList>
                  {item.children.map((child, index) => (
                    <SubMenuItem
                      key={index}
                      onClick={() => handleChildClick(child.path)}
                    >
                      <span>{child.label}</span>
                    </SubMenuItem>
                  ))}
                </SubMenuList>
              )}
            </div>
          ))}
        </MenuList>

        {/* 하단 버튼 */}
        <BottomBtns>
          <StyledBtn onClick={() => navigate('/makers')}>만든이들</StyledBtn>
          <p>|</p>
          <StyledBtn
            onClick={loggedIn ? handleLogoutClick : () => navigate('/login')}
          >
            {loggedIn ? '로그아웃' : '로그인'}
          </StyledBtn>
        </BottomBtns>

        <BottomBalloon />
        <BackgroundImage src={cloudBg} />
      </Container>
    </Overlay>
  );
};

export default SideBar;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

const Container = styled.div`
  position: fixed;
  margin: 0 auto;
  top: 0;
  right: 0;
  left: 0;
  max-width: 440px;
  height: 100%;
  background: white;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.6rem 1.5rem;
  gap: 1rem;
`;

const MenuItem = styled.div`
  display: flex;
  width: fit-content;
  cursor: pointer;
  ${props => props.theme.fontStyles.semibold_20pt}
`;

const SubMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.62rem;
  margin: 0.75rem 0.5rem 0;
  padding-left: 1rem;
  border-left: 1px solid #cdcdcd;
`;

const SubMenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => props.theme.fontStyles.semibold_16pt}
`;

const BottomBtns = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--gray3);
  margin: 0 auto 8rem;
  z-index: 10;
`;

const StyledBtn = styled.p`
  ${props => props.theme.fontStyles.regular_14pt}
`;

const BottomBalloon = styled(Balloon)`
  position: absolute;
  width: 7rem;
  right: 4rem;
  bottom: 11rem;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
`;
