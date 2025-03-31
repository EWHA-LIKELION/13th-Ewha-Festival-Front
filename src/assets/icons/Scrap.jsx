import * as React from 'react';

const SvgScrap = ({ $isScraped, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 22 24'
    width='1.2rem'
    {...props}
  >
    <path
      stroke='#18BB7A'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      fill={$isScraped ? '#18BB7A' : 'none'}
      d='M16.635 1h-11.1C3.084 1 1.092 2.913 1.092 5.245v15.494c0 1.979 1.486 2.815 3.305 1.858l5.619-2.98c.598-.319 1.566-.319 2.153 0l5.619 2.98c1.819.968 3.304.132 3.304-1.858V5.245C21.08 2.913 19.088 1 16.635 1'
    />
  </svg>
);

export default SvgScrap;
