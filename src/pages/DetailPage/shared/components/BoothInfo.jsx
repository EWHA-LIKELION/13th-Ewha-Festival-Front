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
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  height: 2.25rem;
  align-items: center;
`;

const Title = styled.h1`
  flex-grow: 0;
  flex-shrink: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--black, #000);
  padding: 0;
  margin: 0;
  ${({ theme }) => theme.fontStyles.semibold_24pt}
`;

const Category = styled.span`
  flex-shrink: 0;
  margin-left: 0.75rem;
  color: var(--green1-100, #18bb7a);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const Description = styled.p`
  margin-top: 0.31rem;
  color: var(--gray3, #787878);
  white-space: pre-line;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
