import Lottie from 'lottie-react';
import styled from 'styled-components';

import cloudBg from '@/assets/images/cloudBg.png';
import loadingAnimation from '@/assets/lotties/loading.json';

const LoadingScreen = () => (
  <LoadingContainer>
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      style={{ width: '30rem' }}
    />
    <BackgroundImage src={cloudBg} />
  </LoadingContainer>
);

export default LoadingScreen;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  background-color: white;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
`;
