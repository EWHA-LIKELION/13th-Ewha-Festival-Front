import React from 'react';
import styled from 'styled-components';
import { MAKERS_DATA } from '@/constants/makersConstans';
import Profile from './components/Profile';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import lightBg from '@/assets/images/lightBg.png';

// 데이터 정의
const MAIN_SECTIONS = ['멋쟁이사자처럼 13기 운영진', '축제준비위원회 운영진'];
const TOP_ROW_TEAMS = ['기획팀', '대외협력팀'];
const BOTTOM_ROW_TEAMS = ['무대팀', '운영기획팀', '홍보디자인팀'];

const MakersPage = () => {
  return (
    <>
      <MakersWrapper>
        <Header />
        <Title>{`2024\n이화여대 대동제\n만든이들`}</Title>

        {/* 멋사, 축준위 운영진 */}
        {MAIN_SECTIONS.map(teamName => (
          <TeamSection key={teamName}>
            <SectionTitle>{teamName}</SectionTitle>
            <ProfileGrid>
              {MAKERS_DATA[teamName].map((member, index) => (
                <Profile
                  key={`${teamName}-${index}`}
                  name={member.name}
                  role={member.role}
                  task={member.task}
                  image={member.image}
                />
              ))}
            </ProfileGrid>
          </TeamSection>
        ))}

        {/* 기타 운영진 */}
        <OtherTeams>
          <TopRow>
            {TOP_ROW_TEAMS.map(teamName => (
              <TeamBlock key={teamName}>
                <TeamLabel>{teamName}</TeamLabel>
                {MAKERS_DATA[teamName].map((member, index) => (
                  <MemberItem key={`${teamName}-${index}`}>
                    {member.name}
                  </MemberItem>
                ))}
              </TeamBlock>
            ))}
          </TopRow>

          <BottomRow>
            {BOTTOM_ROW_TEAMS.map(teamName => (
              <TeamBlock key={teamName}>
                <TeamLabel>{teamName}</TeamLabel>
                {MAKERS_DATA[teamName].map((member, index) => (
                  <MemberItem key={`${teamName}-${index}`}>
                    {member.name}
                  </MemberItem>
                ))}
              </TeamBlock>
            ))}
          </BottomRow>
        </OtherTeams>
      </MakersWrapper>
      <Footer />
    </>
  );
};

export default MakersPage;

const MakersWrapper = styled.div`
  width: 100%;
  min-height: 100dvh;
  background:
    linear-gradient(
      180deg,
      #aedfcf 0%,
      rgba(252, 254, 254, 1) 44.71%,
      rgba(252, 254, 254, 0) 80%
    ),
    url(${lightBg}) bottom/contain no-repeat;
  padding-bottom: 4rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.semibold_24pt};
  color: var(--green3);
  white-space: pre-line;
  text-align: center;
  margin: 1.25rem 0 2rem;
`;

const TeamSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.fontStyles.semibold_16pt};
  color: var(--green1-100);
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  gap: 0.75rem;
`;

const OtherTeams = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const TeamBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamLabel = styled.div`
  background-color: var(--green1-100);
  color: white;
  ${({ theme }) => theme.fontStyles.medium_10pt};
  padding: 0.15rem 0.4rem;
  border-radius: 1rem;
  width: fit-content;
  margin-bottom: 0.75rem;
`;

const MemberItem = styled.p`
  ${({ theme }) => theme.fontStyles.semibold_12pt};
`;
