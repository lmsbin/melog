'use client';

/**
 * 전역 UI 컨트롤러 접근 훅
 *
 * - useUIState: 전역 UI 상태를 구독(선택적으로 selector 사용)
 * - useUI: 전역 UI 컨트롤러(ui 싱글톤) 인스턴스 접근
 *
 * 설계 의도:
 * - "전역 인스턴스" 접근을 2가지로 제공
 *   1) React 안: useUI(), useUIState()
 *   2) React 밖: import { ui } from '@/shared/ui-controller'
 */

import { useSyncExternalStore } from 'react';
import { ui, type UiState } from './uiController';

export function useUI() {
	return ui;
}

export function useUIState<T>(selector: (s: UiState) => T): T {
	return useSyncExternalStore(
		ui.subscribe,
		() => selector(ui.getState()),
		() => selector(ui.getState())
	);
}
