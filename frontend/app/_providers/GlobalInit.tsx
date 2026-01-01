'use client';

import { useEffect } from 'react';
import commandExecutor from '@/shared/command/commandExecutor';
import '@/features/search/command';

/**
 * 전역 초기화 컴포넌트
 *
 * - RootLayout에 1번만 포함해서, 어떤 페이지든 공통으로 초기화가 수행되도록 합니다.
 * - 여기서는 비즈니스/디버깅을 위한 globalThis 등록 같은 사이드이펙트만 수행하고,
 *   UI는 렌더링하지 않습니다.
 */
export function GlobalInit() {
	useEffect(() => {
		globalThis.$CommandExecutor = commandExecutor;
	}, []);

	return null;
}
