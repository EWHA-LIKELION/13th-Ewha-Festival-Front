import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { SignBoard } from '@/assets/icons';

const Sign = ({ korean, english, left = false, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <SignWrapper onClick={handleClick}>
      <SignBoard left={left} />
      <Destination>
        <Korean>{korean}</Korean>
        <English $left={left}>{english}</English>
      </Destination>
    </SignWrapper>
  );
};

export default Sign;

const SignWrapper = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const Destination = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.62rem;
`;

const Korean = styled.p`
  ${({ theme }) => theme.fontStyles.semibold_20pt};
  color: var(--green3);
`;

const English = styled.p`
  ${({ theme }) => theme.fontStyles.medium_10pt};
  color: var(--green2-60);
  white-space: pre-line;
  text-align: ${({ $left }) => ($left ? 'end' : 'start')};
`;
