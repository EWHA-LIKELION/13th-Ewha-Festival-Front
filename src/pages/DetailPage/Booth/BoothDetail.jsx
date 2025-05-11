import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import http from '@/api/http';
import BoothTabs from '@/pages/DetailPage/Booth/components/BoothTabs.jsx';
import DetailTemplate from '@/pages/DetailPage/shared/components/DetailTemplate.jsx';

const queryClient = new QueryClient();

const BoothDetail = () => {
  const { id } = useParams();
  const booth_id = parseInt(id);
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
  }, [booth_id]);

  useEffect(() => {
    const handlePopState = () => {
      const overlay = document.createElement('div');
      overlay.style =
        'position:fixed; top:0; left:0; width:100%; height:100%; background:white; z-index:9999;';
      document.body.appendChild(overlay);

      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay);
        }
      }, 110);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default BoothDetail;
