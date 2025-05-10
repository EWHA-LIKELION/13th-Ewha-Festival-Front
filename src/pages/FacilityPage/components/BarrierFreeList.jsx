import React, { useState } from 'react';
import styled from 'styled-components';
import barrierFreeData from '@/pages/FacilityPage/components/BarrierFreeData';
import { ArrowDown, ArrowUp } from '@/assets/icons';
import barrierFreeImage from '@/assets/images/facility/BarrierFree.png';

const BarrierFreeList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = index => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <List>
      <Image src={barrierFreeImage} alt='배리어프리 지도' />
      {barrierFreeData.map((item, index) => (
        <Item key={index}>
          <Header onClick={() => toggle(index)}>
            <Title>{item.title}</Title>
            {openIndex === index ? <ArrowUp /> : <ArrowDown />}
          </Header>
          {openIndex === index && (
            <Content>
              {item.content.split('\n').map((line, i) => (
                <BulletLine key={i}>
                  <Bullet>•</Bullet>
                  <span>{line}</span>
                </BulletLine>
              ))}
            </Content>
          )}
        </Item>
      ))}
    </List>
  );
};

export default BarrierFreeList;

const Image = styled.img`
  width: 100%;
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-50, #8bddbc);
  background: #fff;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 3.68rem;
`;

const Item = styled.div`
  border: 1px solid var(--green1-50, #8bddbc);
  background: #fff;
  border-radius: 0.6875rem;
  padding: 1.25rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fontStyles.medium_14pt};
  color: #000;
`;

const Content = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const BulletLine = styled.div`
  ${({ theme }) => theme.fontStyles.regular_14pt};
  color: #000;
  display: flex;
  gap: 0.25rem;
  line-height: 1.5;
`;

const Bullet = styled.span`
  flex-shrink: 0;
`;
