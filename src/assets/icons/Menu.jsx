import * as React from 'react';
const SvgMenu = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    width='1.5rem'
    cursor='pointer'
    {...props}
  >
    <g stroke='#fff' strokeLinecap='round' strokeWidth={1.5}>
      <path d='M3 5h18M3 12h18M3 19h18' />
    </g>
  </svg>
);
export default SvgMenu;
