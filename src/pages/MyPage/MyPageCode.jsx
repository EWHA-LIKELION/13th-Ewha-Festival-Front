import React, { useState } from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BoothItem from '../ListPage/components/BoothItem';
import http from '@/api/http';
import { Error } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';
import useBoothStore from '@/store/BoothStore';
import { ArrowLeft } from '@/assets/icons';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const MyPageCodeInner = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [booth, setBoothState] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const setBooth = useBoothStore(state => state.setBooth); // Zustand store 사용

  const handleChange = e => {
    setValue(e.target.value);
    setError('');
    setMessage('');
    setBoothState(null);
  };

  const handleSearch = async () => {
    try {
      const response = await http.get('/mypages/code/', {
        params: { code: value }
      });
      setBoothState(response.data);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || '코드를 확인해주세요.';
      console.log(err.response?.data);
      setError(msg);
      setBoothState(null);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await http.patch('/mypages/code/', { code: value });
      const msg = response.data?.message || '관리자 권한이 부여되었습니다.';

      setBooth(booth);
      setMessage(msg);

      navigate('/mypage');
    } catch (err) {
      const msg = err.response?.data?.message || '권한 부여에 실패했습니다.';

      setError(msg);
    }
  };

  const isInputValid = value.length > 0;

  return (
    <PageWrapper>
      <Header>
        <ArrowLeft />
        <Title>코드 입력하기</Title>
      </Header>
      <input
        value={value}
        onChange={handleChange}
        placeholder='부스/공연 코드를 입력해주세요.'
      />
      {error && (
        <ErrorText>
          <Error />
          {error}
        </ErrorText>
      )}
      {message && <SuccessText>{message}</SuccessText>}

      {booth && (
        <Search>
          <Text>이 부스/공연이 맞나요?</Text>
          <BoothItem key={booth.id} booth={booth} />
        </Search>
      )}

      <Button
        onClick={booth ? handleConfirm : handleSearch}
        disabled={!isInputValid}
      >
        {booth ? '확인' : '다음'}
      </Button>
    </PageWrapper>
  );
};

const MyPageCode = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MyPageCodeInner />
    </QueryClientProvider>
  );
};

export default MyPageCode;

const PageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 1.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    width: 100%;
  }

  input {
    border-radius: 0.6875rem;
    border: none;
    background: var(--gray1);
    width: 100%;
    height: 2.8125rem;
    padding: 0.75rem 1rem;
    color: var(--gray3);
    ${({ theme }) => theme.fontStyles.regular_14pt}
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fontStyles.regular_20pt}
`;

const Button = styled.button`
  position: absolute;
  bottom: 3rem;
  padding: 0.75rem 3.25rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ disabled }) =>
    disabled ? 'var(--gray2, #CDCDCD)' : 'var(--green1-100)'};
  ${({ theme }) => theme.fontStyles.semibold_14pt}
  width: 90%;
  height: 2.625rem;
  transition: background 0.3s ease-in-out;
`;

const Search = styled.div`
  width: 100%;
`;
const ErrorText = styled.p`
  color: var(--red-100);
  ${({ theme }) => theme.fontStyles.regular_12pt}
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-block: 0.75rem;
  width: 100%;
`;
const Text = styled.h4`
  ${({ theme }) => theme.fontStyles.regular_14pt}
  margin-block: 1rem;
`;
const SuccessText = styled.p`
  color: var(--green2-100);
  ${({ theme }) => theme.fontStyles.regular_12pt}
  margin-block: 0.5rem;
  width: 100%;
`;
