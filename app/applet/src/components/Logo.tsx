export function Logo({ className = "w-8 h-8", color = "currentColor" }: { className?: string, color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="30" r="12" fill={color} />
      <circle cx="50" cy="22" r="12" fill={color} />
      <circle cx="65" cy="30" r="12" fill={color} />
      <path d="M 20 60 L 32 60 L 40 40 L 50 80 L 60 60 L 80 60" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
