import styled from 'styled-components';

const Test = () => {
  return <P>테스트 페이지</P>;
};

export default Test;

const P = styled.div`
  ${({ theme }) => theme.fontStyles.regular_20pt}
`;
