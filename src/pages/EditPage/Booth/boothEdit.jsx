import React from 'react';
import styled from 'styled-components';
import ImageEdit from '../components/ImageEdit';
import BoothName from '../components/BoothName';
import RunningTime from '../components/RunningTime';
import Introduce from '../components/BoothIntroduce';
import Contact from '../components/Contact';
import Status from '../components/OperationStatus';
import EditList from '../components/NoticeMenuEditButton';

const BoothEdit = () => {
  return (
    <EditWrapper>
      <ImageEdit />
      <BoothName />
      <Introduce />
      <RunningTime />
      <Contact />
      <Status />
      <EditList />
    </EditWrapper>
  );
};

export default BoothEdit;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
