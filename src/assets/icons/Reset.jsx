import * as React from 'react';
const SvgReset = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 32 32'
    width='2rem'
    {...props}
  >
    <rect width={31} height={31} x={0.5} y={0.5} stroke='#18BB7A' rx={15.5} />
    <path
      stroke='#18BB7A'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.25}
      d='M13.592 10.233A8.4 8.4 0 0 1 16 9.875a7.223 7.223 0 0 1 7.225 7.225A7.223 7.223 0 0 1 16 24.325 7.223 7.223 0 0 1 8.775 17.1c0-1.483.45-2.867 1.217-4.017M12.558 10.433l2.409-2.766M12.558 10.433l2.809 2.05'
    />
  </svg>
);
export default SvgReset;
