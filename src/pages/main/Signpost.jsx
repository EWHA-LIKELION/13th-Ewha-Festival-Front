import styled from 'styled-components';

const Signpost = () => {
  return (
    <SignpostWrapper>
      <p>이정표 컴포넌트</p>
      <p>제작 파이팅...</p>
    </SignpostWrapper>
  );
};

export default Signpost;

const SignpostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`;
