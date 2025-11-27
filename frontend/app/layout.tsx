import type { Metadata } from "next";
import { QueryProvider } from "./_providers/query-provider";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js + TanStack Query 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

