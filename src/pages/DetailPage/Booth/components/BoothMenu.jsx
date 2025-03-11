import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import basicMenuImg from '@/pages/DetailPage/Booth/images/basicmenu.svg';

const BoothMenu = () => {
  const booth_id = 1;
  const [menus, setMenus] = useState([]);
  const [isBasicImage, setIsBasicImage] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}booths/menus/${booth_id}/`
        );

        const fetchedMenus = response.data.menus || [];
        setMenus(fetchedMenus);

        const initialImageState = fetchedMenus.reduce((acc, _, index) => {
          acc[index] = false;
          return acc;
        }, {});

        setIsBasicImage(initialImageState);
      } catch (error) {
        console.error('Error loading menu data:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleImageError = (index, e) => {
    e.target.src = basicMenuImg;
    setIsBasicImage(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <MenuContainer>
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
        <NoMenuText>메뉴가 없습니다.</NoMenuText>
      )}
    </MenuContainer>
  );
};

export default BoothMenu;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 1.19rem 1.25rem;
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

const NoMenuText = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #888;
  width: 100%;
  grid-column: span 2;
`;
