interface ShadesIllustrationProps {
  className?: string;
}

export default function ShadesIllustration({ className = "" }: ShadesIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 22 Q100 8 190 22" stroke="currentColor" strokeWidth="5" fill="none" />
      <ellipse cx="55" cy="45" rx="38" ry="28" fill="currentColor" opacity="0.85" />
      <ellipse cx="145" cy="45" rx="38" ry="28" fill="currentColor" opacity="0.85" />
      <path d="M93 40 Q100 34 107 40" stroke="currentColor" strokeWidth="5" fill="none" />
      <ellipse cx="42" cy="36" rx="10" ry="6" fill="white" opacity="0.35" transform="rotate(-20 42 36)" />
      <ellipse cx="132" cy="36" rx="10" ry="6" fill="white" opacity="0.35" transform="rotate(-20 132 36)" />
    </svg>
  );
}
