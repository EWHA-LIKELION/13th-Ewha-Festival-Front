import React, { useState } from 'react';
import styled from 'styled-components';
import facilityData from '@/constants/facilityConstants.js';
import { ArrowDown, ArrowUp, Divider } from '@/assets/icons';

const FacilityList = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggle = index => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <List>
      {facilityData.map((item, index) => (
        <Item key={index}>
          <Header
            onClick={() => toggle(index)}
            isOpen={openIndexes.includes(index)}
          >
            <div>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
            </div>
            {openIndexes.includes(index) ? <ArrowUp /> : <ArrowDown />}
          </Header>
          {openIndexes.includes(index) && (
            <>
              <DividerWrapper>
                <Divider />
              </DividerWrapper>
              <Image src={item.image} alt={item.title} />
            </>
          )}
        </Item>
      ))}
    </List>
  );
};

export default FacilityList;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.88rem;
  margin-bottom: 1.5rem;
`;

const Item = styled.div`
  border: 1px solid var(--green1-50, #8bddbc);
  background: #fff;
  border-radius: 0.6875rem;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.25rem;
  padding-bottom: ${({ isOpen }) => (isOpen ? '0' : '1.25rem')};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Title = styled.div`
  ${({ theme }) => theme.fontStyles.semibold_16pt};
  color: var(--bk01, #000);
`;

const Description = styled.p`
  color: var(--gray05, #8e8e8e);
  ${({ theme }) => theme.fontStyles.regular_12pt};
`;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.88rem 0rem;
  padding: 0rem;
`;

const Image = styled.img`
  width: 100%;
  padding: 0rem 1rem 1.25rem 1rem;
`;
