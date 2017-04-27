import React from 'react';

export const Expand = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
      <path d="M5.5 10.5l-4 4M10.5 5.5l4-4" strokeWidth="2"/>
      <path d="M2.5 2.5v6M8.5 2.5h-6M7.5 13.5h6M13.5 7.5v6M15.5.5v3M.5 15.5v-3M3.5 15.5h-3M12.5.5h3"/>
    </g>
  </svg>
);

export const Contract = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
      <path d="M5.5 10.5l-4 4M10.5 5.5l4-4" strokeWidth="2"/>
      <path d="M.5.5v10M10.5.5H.5M5.5 15.5h10M15.5 5.5v10M6.5 12.5v-3M6.5 9.5h-3M9.5 3.5v3M9.5 6.5h3"/>
    </g>
  </svg>
);
