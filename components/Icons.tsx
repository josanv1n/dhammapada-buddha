import React from 'react';

export const DhammaWheel: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    <path d="M50 5 L50 95" stroke="currentColor" strokeWidth="2" />
    <path d="M5 50 L95 50" stroke="currentColor" strokeWidth="2" />
    <path d="M18.18 18.18 L81.82 81.82" stroke="currentColor" strokeWidth="2" />
    <path d="M18.18 81.82 L81.82 18.18" stroke="currentColor" strokeWidth="2" />
    <path d="M50 0 L60 10 L40 10 Z" fill="currentColor" /> 
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
  </svg>
);

export const LotusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2.5s-4.5 4.5-4.5 9c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-4.5-4.5-9-4.5-9Z" />
    <path d="M12 16v6" />
    <path d="M16.5 16a9 9 0 0 0 5-5" />
    <path d="M7.5 16a9 9 0 0 1-5-5" />
    <path d="M12 21c4.5 0 8-3 8-6" />
    <path d="M12 21c-4.5 0-8-3-8-6" />
  </svg>
);