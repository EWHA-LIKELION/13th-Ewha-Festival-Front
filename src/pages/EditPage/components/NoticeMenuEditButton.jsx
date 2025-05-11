import React from 'react';
import { matchPath,useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SmallArrow } from '@/assets/icons';

const EditList = ({ noticeCount, menuCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isShowEditPage = matchPath('/showEdit/:id', location.pathname);

  const handleClickNotice = () => {
    navigate('/noticeEdit');
  };
  const handleClickMenu = () => {
    navigate('/menuEditList');
  };
  return (
    <NoticeContainer>
      <List>
        <Title>공지 수정하기</Title>
        <DetailButton onClick={() => handleClickNotice()}>
          {noticeCount}개
          <SmallArrow />
        </DetailButton>
      </List>
      {!isShowEditPage && (
        <List>
          <Title>메뉴 수정하기</Title>
          <DetailButton onClick={() => handleClickMenu()}>
            {menuCount}개
            <SmallArrow />
          </DetailButton>
        </List>
      )}
    </NoticeContainer>
  );
};

export default EditList;

const NoticeContainer = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  width: 100%;

  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
const DetailButton = styled.button`
  padding-left: 0.5rem;
  border-radius: 1.25rem;
  background: var(--gray1);
  min-width: 4.8rem;
  min-height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;
const List = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.25rem;
`;
