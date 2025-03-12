import * as React from 'react';
const SvgSearch = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    width='1.5rem'
    {...props}
  >
    <g
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
    >
      <path d='M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18M22 22l-3-3' />
    </g>
  </svg>
);
export default SvgSearch;
