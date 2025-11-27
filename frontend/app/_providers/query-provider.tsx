/**
 * TanStack Query Provider 컴포넌트
 *
 * 모든 페이지에서 TanStack Query를 사용할 수 있도록 전역 Provider를 설정합니다.
 * QueryClient 인스턴스를 생성하고 기본 쿼리 옵션(staleTime, gcTime, retry 등)을 설정합니다.
 * 개발 환경에서는 ReactQueryDevtools를 통해 쿼리 상태를 시각적으로 확인할 수 있습니다.
 * useState를 사용하여 컴포넌트 리렌더링 시에도 동일한 QueryClient 인스턴스를 유지합니다.
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
	// useState를 사용하여 리렌더링 시에도 동일한 인스턴스 유지
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5분간 데이터를 신선한 상태로 유지
						gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
						retry: 1, // 실패 시 1번만 재시도
						refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리패치 비활성화
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
