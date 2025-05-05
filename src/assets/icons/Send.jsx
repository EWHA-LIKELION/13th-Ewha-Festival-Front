import * as React from 'react';
const SvgSend = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <rect
      x={24}
      width={24}
      height={24}
      rx={12}
      transform='rotate(90 24 0)'
      fill='#18BB7A'
    />
    <path
      d='M7 11.5L11.5 7L16 11.5'
      stroke='white'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11.5 16.5V7.5'
      stroke='white'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgSend;
