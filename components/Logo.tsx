export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TPS Logo"
    >
      <circle cx="16" cy="16" r="13" fill="#3da5f5" />
      <circle cx="44" cy="16" r="13" fill="#f5b800" />
      <circle cx="16" cy="44" r="13" fill="#1ec77f" />
      <path
        d="M 31 31 Q 57 31 57 44 Q 57 57 44 57 Q 31 57 31 44 Z"
        fill="currentColor"
      />
    </svg>
  );
}