import * as React from 'react';
const SvgCheckBox = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    {...props}
  >
    <rect y='0.5' width='24' height='24' rx='5' fill='#FF635E' />
    <path
      d='M7 13L11 16.5L18 9.5'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
export default SvgCheckBox;
