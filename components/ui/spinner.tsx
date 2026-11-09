/** Small spinner that inherits the text colour. Use inside buttons while waiting. */
export function Spinner({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 animate-spin rounded-full border-2 border-current border-e-transparent ${className}`}
    />
  );
}
