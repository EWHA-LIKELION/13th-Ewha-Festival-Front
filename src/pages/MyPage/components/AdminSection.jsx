import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ArrowLeft from '@/assets/icons/ArrowLeft';
import AdminBg from '@/assets/images/admin.png';

const AdminSection = () => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate('/mypage/code')}>
      <BackgroundImage src={AdminBg} alt='Code Input Background' />
      <Text>
        <AdminText>부스/공연 관리자 인가요?</AdminText>
        <CodeInput>코드 입력하기</CodeInput>
      </Text>
      <StyledArrow />
    </Container>
  );
};

export default AdminSection;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 6.1875rem;
  border-radius: 0.6875rem;
  border: 1px solid var(--red-100, #ff635e);
  background: var(--white, #fff);
  padding: 1.25rem 1.5rem;
  margin-top: 0.75rem;
  overflow: hidden;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Text = styled.div`
  flex-direction: column;
`;

const AdminText = styled.p`
  position: relative;
  color: var(--gray3, #787878);
  ${({ theme }) => theme.fontStyles.regular_14pt}
  z-index: 1;
`;

const CodeInput = styled.p`
  position: relative;
  z-index: 1;
  color: var(--black, #000);
  ${({ theme }) => theme.fontStyles.semibold_20pt}
`;

const StyledArrow = styled(ArrowLeft)`
  transform: rotate(180deg);
  width: 1.5rem;
  height: 1.5rem;
`;
