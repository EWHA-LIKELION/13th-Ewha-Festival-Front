import * as React from 'react';

const SvgDivider = props => (
  <svg
    width={400}
    height={3}
    viewBox='0 0 400 3'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M400.002 1L0.00163987 1.82348'
      stroke='#8BDDBC'
      strokeDasharray='2 2'
    />
  </svg>
);
export default SvgDivider;
