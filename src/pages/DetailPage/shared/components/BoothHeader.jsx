import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Back, BackBlack, Edit, EditBlack } from '@/assets/icons';

const BoothHeader = ({ role, isShow, id }) => {
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

  const handleBackClick = () => {
    const prevPath =
      sessionStorage.getItem('prevPath') ||
      (isShow ? '/showlist' : '/boothlist');

    navigate(prevPath);
  };

  return (
    <Header $isScrolled={$isScrolled}>
      <BackButton onClick={handleBackClick}>
        {$isScrolled ? <BackBlack /> : <Back />}
      </BackButton>

      {role === 'admin' && (
        <EditButton
          onClick={() =>
            navigate(isShow ? `/showEdit/${id}` : `/boothEdit/${id}`)
          }
        >
          {$isScrolled ? <EditBlack /> : <Edit />}
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
  cursor: pointer;
`;

const EditButton = styled.div`
  cursor: pointer;
`;
