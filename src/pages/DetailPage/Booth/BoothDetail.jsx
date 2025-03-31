import React, { useState, useEffect } from 'react';
import http from '@/api/http';
import DetailTemplate from '@/pages/DetailPage/shared/components/DetailTemplate.jsx';

import BoothTabs from '@/pages/DetailPage/Booth/components/BoothTabs.jsx';

const BoothDetail = () => {
  const booth_id = 1;
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
        setThumbnailSrc(response.data.booth.thumbnail);
        setScrapState(response.data.is_scrap);
        setRole(response.data.booth.role || 'guest');
      } catch (error) {}
    };

    fetchBoothData();
  }, []);

  return (
    <DetailTemplate
      boothData={boothData}
      operatingHours={operatingHours}
      thumbnailSrc={thumbnailSrc}
      setThumbnailSrc={setThumbnailSrc}
      scrapState={scrapState}
      setScrapState={setScrapState}
      boothId={booth_id}
      role={role}
      BoothTabsComponent={BoothTabs}
    />
  );
};

export default BoothDetail;
