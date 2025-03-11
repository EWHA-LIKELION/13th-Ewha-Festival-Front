import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import BoothHeader from '@/pages/DetailPage/Booth/components/BoothHeader';
import BoothInfo from '@/pages/DetailPage/Booth/components/BoothInfo.jsx';
import BoothButton from '@/pages/DetailPage/Booth/components/BoothButton.jsx';
import BoothMeta from '@/pages/DetailPage/Booth/components/BoothMeta.jsx';
import BoothTabs from '@/pages/DetailPage/Booth/components/BoothTabs.jsx';
import basicThumbnail from '@/pages/DetailPage/Booth/images/basicThumbnail.svg';

const BoothDetail = () => {
  const booth_id = 1; // 👈 테스트용으로 booth_id를 1로 고정해놨음. 나중에 유선언니 목록 페이지 작업 끝나면 수정해 주기
  const [boothData, setBoothData] = useState(null);
  const [operatingHours, setOperatingHours] = useState([]);
  const [thumbnailSrc, setThumbnailSrc] = useState(null);

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}booths/notices/${booth_id}/`
        );

        setBoothData(response.data.booth);
        setOperatingHours(response.data.operating_hours || []);
        setThumbnailSrc(response.data.booth.thumbnail || basicThumbnail);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchBoothData();
  }, []);

  if (!boothData) return <p>Loading...</p>;

  return (
    <>
      <BoothHeader />
      <ThumbnailWrapper>
        <BoothThumbnail
          src={thumbnailSrc}
          alt={boothData.name || '기본 이미지'}
          onError={() => setThumbnailSrc(basicThumbnail)}
        />
      </ThumbnailWrapper>
      <InfoWrapper>
        <BoothInfo
          name={boothData.name}
          category={boothData.category}
          description={boothData.description}
        />
        <BoothButton
          contact={boothData.contact}
          scrapCount={boothData.scrap_count}
        />
        <BoothMeta
          location={boothData.formatted_location}
          operatingHours={operatingHours}
        />
      </InfoWrapper>
      <BoothTabs />
    </>
  );
};

export default BoothDetail;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const BoothThumbnail = styled.img`
  z-index: 0;
  width: 100%;
  height: 15rem;
  object-fit: cover;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 35.78%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const InfoWrapper = styled.div`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
  justify-content: flex-start;
`;
