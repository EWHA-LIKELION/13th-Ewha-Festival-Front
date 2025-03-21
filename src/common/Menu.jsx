import React from 'react';
import styled from 'styled-components';
import { Trash2 } from 'lucide-react';

const MenuCard = ({ imageUrl, name, price, onDelete }) => {
  return (
    <CardContainer>
      <ImageWrapper>
        <MenuImage src={imageUrl} alt={name} />
        <DeleteIcon onClick={onDelete} />
      </ImageWrapper>
      <InfoWrapper>
        <MenuName>{name}</MenuName>
        <MenuPrice>{price}원</MenuPrice>
      </InfoWrapper>
    </CardContainer>
  );
};

export default MenuCard;

const CardContainer = styled.div`
  width: 200px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const MenuImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
`;

const DeleteIcon = styled(Trash2)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

const MenuPrice = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;
