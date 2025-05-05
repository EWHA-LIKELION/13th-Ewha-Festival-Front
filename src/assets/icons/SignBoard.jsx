import * as React from 'react';
const SvgSignBoard = ({ left = false, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 173 60'
    width='10rem'
    style={{
      display: 'block',
      transform: left ? 'scale(-1,1)' : undefined
    }}
    {...props}
  >
    <path
      fill='url(#SignBoard_svg__a)'
      d='M140.08 0H0v59.361h140.08a9 9 0 0 0 6.189-2.466l24.899-23.584a5 5 0 0 0 0-7.26L146.269 2.466A9 9 0 0 0 140.08 0'
    />
    <defs>
      <linearGradient
        id='SignBoard_svg__a'
        x1={87.5}
        x2={87.5}
        y1={0}
        y2={59.361}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#FFFDEA' />
        <stop offset={1} stopColor='#F3F2C8' />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgSignBoard;
