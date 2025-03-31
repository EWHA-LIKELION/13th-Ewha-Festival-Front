import * as React from 'react';
const SvgArrowDown = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    width='1.5rem'
    {...props}
  >
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95'
    />
  </svg>
);
export default SvgArrowDown;
