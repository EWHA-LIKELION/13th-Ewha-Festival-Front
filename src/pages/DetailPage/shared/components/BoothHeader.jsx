import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import backIcon from '@/pages/DetailPage/Booth/images/back.svg';
import backBlackIcon from '@/pages/DetailPage/Booth/images/backBlack.svg';
import editIcon from '@/pages/DetailPage/Booth/images/edit.svg';
import editBlackIcon from '@/pages/DetailPage/Booth/images/editBlack.svg';

const BoothHeader = ({ role, isShow }) => {
  const navigate = useNavigate();
  const [$isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Header $isScrolled={$isScrolled}>
      <BackButton onClick={() => navigate(isShow ? '/showlist' : '/boothlist')}>
        <img src={$isScrolled ? backBlackIcon : backIcon} alt='Back' />
      </BackButton>
      {role === 'admin' && (
        <EditButton
          onClick={() => navigate(isShow ? '/showEdit/' : '/boothEdit/')}
        >
          <img src={$isScrolled ? editBlackIcon : editIcon} alt='edit' />
        </EditButton>
      )}
    </Header>
  );
};

export default BoothHeader;

const Header = styled.div`
  width: 100%;
  max-width: 440px;
  height: 4.31rem;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  justify-content: space-between;
  top: 0;
  z-index: 100;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0) 100%
  );

  transition:
    background 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  ${({ $isScrolled }) =>
    $isScrolled &&
    `
    background: #FFF;
    box-shadow: 0px 2px 13.1px 0px rgba(0, 0, 0, 0.08);
  `}
`;

const BackButton = styled.div`
  img {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;

const EditButton = styled.div`
  img {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;
