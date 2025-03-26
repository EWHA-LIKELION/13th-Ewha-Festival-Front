import * as React from 'react';
const SvgFilter = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 32 32'
    width='2.3rem'
    {...props}
  >
    <rect width={31} height={31} x={0.5} y={0.5} stroke='#787878' rx={15.5} />
    <mask
      id='Filter_svg__a'
      width={10}
      height={14}
      x={11}
      y={9}
      fill='#000'
      maskUnits='userSpaceOnUse'
    >
      <path fill='#fff' d='M11 9h10v14H11z' />
      <path d='M14 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0M20 18a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
    </mask>
    <path
      fill='#787878'
      d='M19.5 10a.5.5 0 0 0-1 0zm-1 6a.5.5 0 0 0 1 0zm1 3.5a.5.5 0 0 0-1 0zm-1 2.5a.5.5 0 0 0 1 0zm-5-7.5a.5.5 0 0 0-1 0zm-1 7.5a.5.5 0 0 0 1 0zm1-12a.5.5 0 0 0-1 0zm-1 1.5a.5.5 0 0 0 1 0zm6-1.5v6h1v-6zm0 9.5V22h1v-2.5zm-6-5V22h1v-7.5zm0-4.5v1.5h1V10zm.5 3v2a2 2 0 0 0 2-2zm0 0h-2a2 2 0 0 0 2 2zm0 0v-2a2 2 0 0 0-2 2zm0 0h2a2 2 0 0 0-2-2zm6 5v2a2 2 0 0 0 2-2zm0 0h-2a2 2 0 0 0 2 2zm0 0v-2a2 2 0 0 0-2 2zm0 0h2a2 2 0 0 0-2-2z'
      mask='url(#Filter_svg__a)'
    />
  </svg>
);
export default SvgFilter;
