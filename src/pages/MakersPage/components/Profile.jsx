import React from 'react';
import styled from 'styled-components';

const Profile = ({ name, role, task, image }) => {
  return (
    <ProfileWrapper
      style={
        image && {
          backgroundImage: `url(${image})`
        }
      }
    >
      <Tag>
        <Role>{role}</Role>
        <Name>{name}</Name>
      </Tag>

      <Task>{task}</Task>
    </ProfileWrapper>
  );
};

export default React.memo(Profile);

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 9rem;
  height: 9rem;
  border-radius: 0.6rem;
  padding: 0.75rem;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }
`;

const Tag = styled.div`
  z-index: 2;
  color: white;
`;

const Role = styled.div`
  padding: 0.15rem 0.4rem;
  border-radius: 1rem;
  width: fit-content;
  background-color: var(--green1-100);
  ${({ theme }) => theme.fontStyles.medium_10pt};
  margin-bottom: 0.15rem;
`;

const Name = styled.h3`
  ${({ theme }) => theme.fontStyles.semibold_16pt};
`;

const Task = styled.p`
  ${({ theme }) => theme.fontStyles.medium_10pt};
  white-space: pre-line;
  color: var(--gray1);
  z-index: 2;
`;
