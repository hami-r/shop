/** Re-mounts on every navigation, so each new page fades in instead of appearing abruptly. */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
