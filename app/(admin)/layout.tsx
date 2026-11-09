import { Suspense } from "react";
import { RouteProgress } from "@/components/motion/route-progress";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="font-sans">
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
