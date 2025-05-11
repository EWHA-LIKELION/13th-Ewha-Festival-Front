import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import noScrapBg from '@/assets/images/noScrap.png';
import useScrapStore from '@/store/useScrapStore';

import ScrapItem from './ScrapItem';

const ScrapBook = () => {
  const { scraps, fetchScraps } = useScrapStore();
  const booths = scraps?.booths || [];
  const shows = scraps?.shows || [];
  const items = [...booths, ...shows];
  const totalScraps = scraps?.total_scrap_count || 0;
  const hasScraps = items.length > 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchScraps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {!hasScraps && <BackgroundImage src={noScrapBg} alt='배경' />}

      <Header>
        <Title>스크랩북({totalScraps})</Title>
        <More onClick={() => navigate('/scrap')}>더보기</More>
      </Header>
      {hasScraps ? (
        <Grid>
          {items.slice(0, 4).map(item => (
            <ScrapItem
              key={item.id}
              name={item.booth?.name}
              thumbnail={item.booth?.images?.[0] || ''}
              booth_id={item.booth?.id}
              is_show={item.is_show}
            />
          ))}
        </Grid>
      ) : (
        <>
          <Bottom>
            <Message>아직 스크랩한 내용이 없어요.</Message>
            <GoLink onClick={() => navigate('/boothlist')}>
              스크랩 하러 가기
            </GoLink>
          </Bottom>
        </>
      )}
    </Container>
  );
};

export default ScrapBook;

const Container = styled.div`
  position: relative;
  width: 100%;
  background: var(--white, #fff);
  min-height: 13.9375rem;
  padding: 1.25rem 1.5rem;
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-100, #18bb7a);
  margin-top: 0.75rem;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  position: relative;
`;

const Title = styled.span`
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.semibold_20pt}
`;
const More = styled.span`
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const Bottom = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Message = styled.p`
  color: var(--black, #000);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_14pt}
  position: relative;
  z-index: 1;
  white-space: nowrap;
`;

const GoLink = styled.p`
  color: var(--gray3, #787878);
  text-align: center;
  ${({ theme }) => theme.fontStyles.regular_14pt}
  position: relative;
  cursor: pointer;
  z-index: 1;
  text-decoration: underline;
  text-underline-position: under;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 0.75rem;
  position: relative;
  z-index: 1;
`;
