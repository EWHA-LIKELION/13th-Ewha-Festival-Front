import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import http from '@/api/http';

import BoothHeader from '@/pages/DetailPage/Booth/components/BoothHeader';
import BoothInfo from '@/pages/DetailPage/Booth/components/BoothInfo.jsx';
import BoothButton from '@/pages/DetailPage/Booth/components/BoothButton.jsx';
import BoothMeta from '@/pages/DetailPage/Booth/components/BoothMeta.jsx';
import BoothTabs from '@/pages/DetailPage/Booth/components/BoothTabs.jsx';
import basicThumbnail from '@/pages/DetailPage/Booth/images/basicThumbnail.svg';

const BoothDetail = () => {
  const booth_id = 1; // ✅ 부스 목록 개발 끝나면 변경해주기
  const [boothData, setBoothData] = useState(null);
  const [operatingHours, setOperatingHours] = useState([]);
  const [thumbnailSrc, setThumbnailSrc] = useState(null);
  const [scrapState, setScrapState] = useState(false);
  const [role, setRole] = useState('guest');

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const response = await http.get(`/booths/notices/${booth_id}/`);

        setBoothData(response.data.booth);
        setOperatingHours(response.data.operating_hours || []);
        setThumbnailSrc(response.data.booth.thumbnail || basicThumbnail);
        setScrapState(response.data.is_scrap);
        setRole(response.data.booth.role || 'guest');
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchBoothData();
  }, []);

  if (!boothData) return <p>Loading...</p>;

  return (
    <>
      <BoothHeader role={role} />
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
          scrapState={scrapState}
          setScrapState={setScrapState}
          boothId={booth_id}
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
  background-color: white;
`;
