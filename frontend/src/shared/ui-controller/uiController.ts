/**
 * 전역 UI 컨트롤러 (싱글톤)
 *
 * 목표:
 * - 페이지/컴포넌트에서 "로딩 오버레이", "툴팁" 같은 UI 동작을 공통 API로 제어
 * - 외부 라이브러리 없이(=zustand 등 없이) 가벼운 store + subscribe 형태로 구현
 *
 * 사용 예시:
 * - ui.loading.set('character-page', true, '캐릭터 정보를 불러오는 중...')
 * - ui.loading.set('character-page', false)
 * - ui.tooltip.show({ x, y, content: <div>툴팁</div> })
 * - ui.tooltip.move(x, y)
 * - ui.tooltip.hide()
 */

import type { ReactNode } from 'react';

export type UiLoadingState = {
	/**
	 * 현재 로딩 오버레이를 띄우고 있는 "키" 목록
	 * 여러 곳에서 동시에 로딩을 켤 수 있도록 Set 개념으로 관리합니다.
	 */
	activeKeys: string[];
	/**
	 * 키별 메시지 (선택)
	 */
	messageByKey: Record<string, string | undefined>;
	/**
	 * 실제 표시할 메시지 (가장 마지막으로 set된 메시지를 우선)
	 */
	message?: string;
};

export type UiTooltipState = {
	visible: boolean;
	x: number;
	y: number;
	offsetX: number;
	offsetY: number;
	/**
	 * 툴팁 내용은 호출부에서 ReactNode로 넘겨 받습니다.
	 * (예: 아이템 툴팁/도움말 툴팁 등)
	 */
	content: ReactNode | null;
	/**
	 * content가 변경될 때마다 증가시키는 버전 (UIHost에서 크기 측정 트리거로 사용)
	 */
	version: number;
};

export type UiState = {
	loading: UiLoadingState;
	tooltip: UiTooltipState;
};

type Listener = () => void;

function uniq(arr: string[]) {
	return Array.from(new Set(arr));
}

function createInitialState(): UiState {
	return {
		loading: {
			activeKeys: [],
			messageByKey: {},
			message: undefined,
		},
		tooltip: {
			visible: false,
			x: 0,
			y: 0,
			offsetX: 16,
			offsetY: 16,
			content: null,
			version: 0,
		},
	};
}

class UiController {
	private state: UiState = createInitialState();
	private listeners = new Set<Listener>();

	// React에서 useSyncExternalStore로 구독하기 위한 API
	subscribe = (listener: Listener) => {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	};

	getState = () => this.state;

	private emit() {
		for (const l of this.listeners) l();
	}

	private setState(next: UiState) {
		this.state = next;
		this.emit();
	}

	loading = {
		/**
		 * key 단위로 로딩 오버레이를 켜고/끄는 API
		 * - 여러 컴포넌트가 동시에 로딩을 켤 수 있으며(activeKeys),
		 *   activeKeys가 1개라도 있으면 전역 로딩 오버레이가 표시됩니다.
		 */
		set: (key: string, isActive: boolean, message?: string) => {
			const prev = this.state;
			const prevKeys = prev.loading.activeKeys;
			const activeKeys = isActive
				? uniq([...prevKeys, key])
				: prevKeys.filter((k) => k !== key);

			const messageByKey = { ...prev.loading.messageByKey };
			if (isActive) messageByKey[key] = message;
			else delete messageByKey[key];

			// 표시 메시지는 "가장 최근에 켜진 key의 message"를 우선
			const lastKey = activeKeys[activeKeys.length - 1];
			const nextMessage = lastKey ? messageByKey[lastKey] : undefined;

			this.setState({
				...prev,
				loading: {
					activeKeys,
					messageByKey,
					message: nextMessage,
				},
			});
		},
		clearAll: () => {
			const prev = this.state;
			this.setState({
				...prev,
				loading: createInitialState().loading,
			});
		},
	};

	tooltip = {
		show: (args: {
			x: number;
			y: number;
			content: ReactNode;
			offsetX?: number;
			offsetY?: number;
		}) => {
			const prev = this.state;
			this.setState({
				...prev,
				tooltip: {
					visible: true,
					x: args.x,
					y: args.y,
					offsetX: args.offsetX ?? 16,
					offsetY: args.offsetY ?? 16,
					content: args.content,
					version: prev.tooltip.version + 1,
				},
			});
		},
		move: (x: number, y: number) => {
			const prev = this.state;
			if (!prev.tooltip.visible) return;
			this.setState({
				...prev,
				tooltip: { ...prev.tooltip, x, y },
			});
		},
		hide: () => {
			const prev = this.state;
			if (!prev.tooltip.visible && !prev.tooltip.content) return;
			this.setState({
				...prev,
				tooltip: { ...prev.tooltip, visible: false, content: null },
			});
		},
	};
}

/**
 * 전역 싱글톤 인스턴스
 * - React 컴포넌트 밖에서도(import로) 사용 가능
 */
export const ui = new UiController();
