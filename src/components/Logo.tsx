import React from 'react';

export function Logo({ className = "w-8 h-8", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3 dots on top */}
      <circle cx="33" cy="30" r="10" fill={color} />
      <circle cx="50" cy="22" r="10" fill={color} />
      <circle cx="67" cy="30" r="10" fill={color} />
      {/* Heartbeat pulse */}
      <path d="M 22 55 L 35 55 L 42 35 L 50 75 L 56 55 L 78 55" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
