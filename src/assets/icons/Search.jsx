import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const SvgSearch = props => {
  const navigate = useNavigate();

  const handleClick = e => {
    if (props.onClick) {
      props.onClick(e);
    } else {
      navigate('/search');
    }
  };

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width='1.5rem'
      cursor='pointer'
      onClick={handleClick}
      {...props}
    >
      <g strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}>
        <path
          stroke='#000000'
          d='M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18M22 22l-3-3'
        />
      </g>
    </svg>
  );
};
export default SvgSearch;
