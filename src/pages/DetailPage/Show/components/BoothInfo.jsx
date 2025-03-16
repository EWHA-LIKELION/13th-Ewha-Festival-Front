import React from 'react';
import styled from 'styled-components';

const BoothInfo = ({ name, category, description }) => {
  return (
    <InfoContainer>
      <Top>
        <Title>{name}</Title>
        <Category>{category}</Category>
      </Top>
      <Description>{description}</Description>
    </InfoContainer>
  );
};

export default BoothInfo;

const InfoContainer = styled.div`
  margin-bottom: 1rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.25rem;
  align-items: center;
`;
const Title = styled.h1`
  color: var(--black, #000);
  padding: 0;
  margin: 0;

  ${({ theme }) => theme.fontStyles.semibold_24pt}
`;

const Category = styled.span`
  margin-left: 0.75rem;
  color: var(--green1-100, #18bb7a);

  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const Description = styled.p`
  margin-top: 0.31rem;
  color: var(--gray3, #787878);

  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
