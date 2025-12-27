import type { Metadata } from 'next';
import { QueryProvider } from './_providers/query-provider';
import { UIHost } from '@/shared/ui-controller';
import './globals.css';

export const metadata: Metadata = {
	title: 'My App',
	description: 'Next.js + TanStack Query 프로젝트',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko'>
			<body>
				<QueryProvider>
					{children}
					{/* 전역 UI(로딩 오버레이/툴팁 등)는 여기서 한 번만 마운트 */}
					<UIHost />
				</QueryProvider>
			</body>
		</html>
	);
}
