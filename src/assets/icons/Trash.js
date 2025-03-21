import * as React from 'react';
const SvgTrash = props => (
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
      d='M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08'
    />
  </svg>
);
export default SvgTrash;
