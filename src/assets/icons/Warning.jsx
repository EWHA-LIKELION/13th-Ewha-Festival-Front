import * as React from 'react';
const SvgWarning = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 48 48'
    width='3rem'
    {...props}
  >
    <circle cx={24} cy={24} r={24} fill='#FFE0DF' />
    <circle cx={24} cy={24} r={12.25} stroke='#FF635E' strokeWidth={1.5} />
    <path
      fill='#FF635E'
      d='M24.67 25.143h-1.354l-.123-7.041h1.6zM24 28.096a1 1 0 0 1-.492-.13.95.95 0 0 1-.479-.841.951.951 0 0 1 .479-.84 1 1 0 0 1 .492-.13q.253 0 .479.13.225.129.355.355a.9.9 0 0 1 .137.485.9.9 0 0 1-.137.485.95.95 0 0 1-.355.356.94.94 0 0 1-.479.13'
    />
  </svg>
);
export default SvgWarning;
