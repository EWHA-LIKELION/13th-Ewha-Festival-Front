import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScrapItem = ({ name, thumbnail, booth_id, is_show }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (is_show) {
      navigate(`/showdetail/${booth_id}`);
    } else {
      navigate(`/boothdetail/${booth_id}`);
    }
  };

  return (
    <Item onClick={handleClick}>
      {thumbnail ? <Image src={thumbnail} alt={name} /> : <ImageFallback />}
      <Name>{name}</Name>
    </Item>
  );
};

export default ScrapItem;

const Item = styled.div`
  position: relative;
  border-radius: 0.6875rem;
  overflow: hidden;
  height: 8.75rem;
  width: 100%;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--green2-60, rgba(0, 124, 74, 0.6));
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const Name = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1.25rem;
  right: 1.25rem;
  color: white;
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  z-index: 2;
`;
