import * as React from 'react';
const SvgCheckedCircle = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 22 22'
    width='1.25rem'
    {...props}
  >
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m6 9 5.454 7L21 2'
    />
    <circle cx={11} cy={11} r={9.25} stroke='#fff' strokeWidth={1.5} />
  </svg>
);
export default SvgCheckedCircle;
