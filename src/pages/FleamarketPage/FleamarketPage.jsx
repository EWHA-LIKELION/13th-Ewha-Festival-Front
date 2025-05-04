import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import trackImg from '@/assets/images/trackImg.png';
import { ArrowDown, ArrowUp } from '@/assets/icons';
import { FLEA_MARKET_INFO } from '@/constants/fleamarketConstants';

const FleamarketPage = () => {
  const [openBooth, setOpenBooth] = useState(null);

  const toggleBooth = index => {
    setOpenBooth(openBooth === index ? null : index);
  };

  return (
    <>
      {/* 헤더 */}
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <FleamarketSection>
        {/* 지도 */}
        <MainContent>
          <Title>화랑's Flea Market</Title>
          <Subtitle>스포츠트랙</Subtitle>

          <Divider />
          <MapImage src={trackImg} alt='플리마켓 지도' />
        </MainContent>

        {/* 부스 리스트 */}

        {FLEA_MARKET_INFO.map((booth, index) => (
          <BoothItem key={index}>
            {/* 부스 정보 */}
            <BoothHeader onClick={() => toggleBooth(index)}>
              <BoothInfo>
                <BoothName>{booth.id}</BoothName>
                <BoothName>{booth.name}</BoothName>
                <DayTag>{booth.days.join(' · ')}</DayTag>
              </BoothInfo>
              {openBooth === index ? (
                <ArrowUp style={{ width: '1.25rem' }} />
              ) : (
                <ArrowDown style={{ width: '1.25rem' }} />
              )}
            </BoothHeader>

            {/* 부스 설명 */}
            {openBooth === index && (
              <BoothDescription>{booth.description}</BoothDescription>
            )}

            {index < FLEA_MARKET_INFO.length - 1 && <ItemDivider />}
          </BoothItem>
        ))}
      </FleamarketSection>

      <Footer />
    </>
  );
};

export default FleamarketPage;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0px 2px 13.1px 0px rgba(0, 0, 0, 0.08);
`;

const FleamarketSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: white;
`;

const MainContent = styled.div`
  padding: 1rem 0;
  border-radius: 0.6875rem;
  border: 1px solid var(--green1-50);
  margin: 1rem 0;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.semibold_16pt}
  margin-bottom: 0.31rem;
  margin-left: 1.25rem;
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--green2-100);
  margin-left: 1.25rem;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px dashed var(--green1-50);
  margin: 1rem 0;
`;

const MapImage = styled.img`
  width: 100%;
  padding: 0 1.25rem;
  object-fit: cover;
`;

const BoothItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoothHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
`;

const BoothInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const BoothName = styled.span`
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;

const DayTag = styled.span`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--green2-100);
  margin-left: 0.45rem;
`;

const BoothDescription = styled.p`
  ${({ theme }) => theme.fontStyles.regular_12pt}
  color: var(--gray3);
  padding-bottom: 1rem;
`;

const ItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--gray1);
`;
