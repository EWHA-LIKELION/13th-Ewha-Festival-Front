import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import http from '@/api/http';
import basicMenuImg from '@/assets/images/BasicMenu.png';
import noMenuImg from '@/assets/images/cloudBg.png';

const BoothMenu = ({ boothId }) => {
  const [menus, setMenus] = useState([]);
  const [isBasicImage, setIsBasicImage] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await http.get(`/booths/menus/${boothId}/`);

        const fetchedMenus = response.data.menus || [];
        setMenus(fetchedMenus);

        const initialImageState = fetchedMenus.reduce((acc, _, index) => {
          acc[index] = false;
          return acc;
        }, {});

        setIsBasicImage(initialImageState);
      } catch (error) {}
    };

    fetchMenus();
  }, [boothId]);

  const handleImageError = (index, e) => {
    e.target.src = basicMenuImg;
    setIsBasicImage(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <MenuContainer $hasMenus={menus.length > 0}>
      {menus.length > 0 ? (
        menus.map((menu, index) => (
          <MenuItem key={index} isSoldOut={!menu.is_sale}>
            <MenuImage
              src={menu.thumbnail || basicMenuImg}
              alt={menu.name}
              onError={e => handleImageError(index, e)}
            />
            <MenuGradient isBasic={isBasicImage[index]} />
            <MenuOverlay isSoldOut={!menu.is_sale}>
              {!menu.is_sale && <SoldOutText>판매 종료</SoldOutText>}
            </MenuOverlay>
            <MenuTextWrapper>
              <MenuText>{menu.name}</MenuText>
              <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
            </MenuTextWrapper>
          </MenuItem>
        ))
      ) : (
        <NoMenu>
          <NoMenuText>
            등록된 메뉴가 없어요.
            <br />
            다음에 다시 확인해주세요.
          </NoMenuText>
          <NoMenuImage src={noMenuImg} alt='등록된 메뉴 없음' />
        </NoMenu>
      )}
    </MenuContainer>
  );
};

export default BoothMenu;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  background-color: white;
  ${({ $hasMenus }) =>
    $hasMenus &&
    `
    padding: 1.19rem 1.25rem;
  `}
`;

const MenuItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6875rem;
  overflow: hidden;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const MenuGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;

  ${({ isBasic }) =>
    !isBasic &&
    `
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
    `}
`;

const MenuOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;

  ${({ isSoldOut }) =>
    isSoldOut &&
    `
      background: var(--green2-60, rgba(0, 124, 74, 0.60));
    `}
`;

const SoldOutText = styled.div`
  color: var(--white, #fff);
  text-shadow: 0px 2px 13.1px rgba(0, 0, 0, 0.08);
  ${({ theme }) => theme.fontStyles.semibold_24pt}
`;

const MenuTextWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem;
  z-index: 4;
`;

const MenuText = styled.div`
  z-index: 4;
  margin-bottom: 0.31rem;
  color: var(--white, #fff);
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const MenuPrice = styled.div`
  z-index: 4;
  color: var(--white, #fff);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const NoMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-top: 6.88rem;
  padding-bottom: 5rem;
  min-height: 60vh;
  overflow: hidden;
  grid-column: span 2;
`;

const NoMenuText = styled.p`
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_14pt};
  text-align: center;
  margin-bottom: 1rem;
  z-index: 1;
`;

const NoMenuImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 0;
`;
