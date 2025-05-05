import * as React from 'react';
const SvgDay1 = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 79 44'
    width='4.625rem'
    {...props}
  >
    <g filter='url(#Day1_svg__a)'>
      <path
        fill='#000'
        d='M18.532 2.88q0 2.736.048 4.272t.144 2.736q-.384-.096-1.488-.144a55 55 0 0 0-2.448-.048 79 79 0 0 0-2.736-.048H6.964l-.576 9.264a18 18 0 0 1 2.352-.96q1.296-.48 3.264-.48 2.928 0 4.8.96t2.784 2.64.912 3.792q0 2.784-1.392 5.04t-3.744 3.84a18 18 0 0 1-5.088 2.496 18.9 18.9 0 0 1-5.616.864v-.864q2.112 0 4.128-.72a10.4 10.4 0 0 0 3.6-2.064q1.632-1.344 2.592-3.36t.96-4.752q0-3.024-1.584-4.704-1.536-1.728-4.464-1.728-1.248 0-2.112.24-.816.192-1.824.576l-.48-.288.912-14.304q.528.096 1.2.144.72.048 1.392.048h5.424q1.968 0 2.496-.528.528-.576.72-1.92zm9.938 21.648q1.248 0 2.16.912t.912 2.16-.912 2.16-2.16.912-2.16-.912-.912-2.16.912-2.16 2.16-.912M46.66 4.752v20.304q0 2.304 1.056 3.12t3.552.816V30a127 127 0 0 0-2.832-.096 72 72 0 0 0-3.792-.096 92 92 0 0 0-4.272.096q-2.016.048-3.12.096v-1.008q2.4 0 3.744-.768 1.344-.816 1.344-3.168V13.44q0-2.304-.48-3.408t-1.728-1.44q-1.2-.336-3.36-.336V7.2q3.456-.096 5.76-.624t4.128-1.824m22.037-.144.192 1.248L55.401 24.96l-.048-.768h14.688q1.968 0 2.496-.528.528-.576.72-1.92h.816q0 2.352.048 3.6t.144 2.304q-.336-.096-1.104-.096a93 93 0 0 0-1.728-.096 45 45 0 0 0-2.112-.048H53.097V26.4zm.768 0v32.16h-3.84V9.696l3.072-5.088z'
      />
    </g>
    <defs>
      <filter
        id='Day1_svg__a'
        width={77.605}
        height={42.224}
        x={0.66}
        y={0.88}
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          result='hardAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
        <feBlend
          in2='BackgroundImageFix'
          result='effect1_dropShadow_1828_10881'
        />
        <feBlend
          in='SourceGraphic'
          in2='effect1_dropShadow_1828_10881'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);
export default SvgDay1;
