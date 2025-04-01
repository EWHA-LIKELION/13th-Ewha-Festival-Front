import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const SvgArrowLeft = props => {
  const navigate = useNavigate();

  const handleClick = e => {
    // 상위 컴포넌트에서 전달한 onClick
    if (props.onClick) {
      props.onClick(e);
    } else {
      navigate(-1);
    }
  };

  const { onClick, ...restProps } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width='1.5rem'
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      {...restProps}
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08'
      />
    </svg>
  );
};
export default SvgArrowLeft;
