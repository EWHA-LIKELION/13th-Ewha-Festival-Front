import React from 'react';
import styled from 'styled-components';
import ImageEdit from '../components/ImageEdit';
import BoothName from '../components/BoothName';
import RunningTime from '../components/RunningTime';
import Introduce from '../components/BoothIntroduce';
import Contact from '../components/Contact';
import Status from '../components/OperationStatus';
import EditList from '../components/NoticeMenuEditButton';

const ShowEdit = () => {
  return (
    <EditWrapper>
      <ImageEdit />
      <BoothName title='공연명' />
      <Introduce />
      <RunningTime />
      <Contact />
      <Status />
      <EditList />
    </EditWrapper>
  );
};

export default ShowEdit;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
