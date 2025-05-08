import * as React from 'react';
const SvgCircle = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 22 22'
    width='1.25rem'
    {...props}
  >
    <circle cx={11} cy={11} r={9.25} stroke='#fff' strokeWidth={1.5} />
  </svg>
);
export default SvgCircle;
