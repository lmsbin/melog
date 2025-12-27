'use client';

/**
 * 전역 UI Host
 *
 * - ui(전역 싱글톤) 상태를 구독해서, 실제 DOM에 그려주는 역할만 합니다.
 * - RootLayout(또는 최상단 Provider)에서 단 1번만 마운트하세요.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { LoadingOverlay } from '@/shared/components/ui';
import { useUIState } from './hooks';

export function UIHost() {
	const loading = useUIState((s) => s.loading);
	const tooltip = useUIState((s) => s.tooltip);

	// 툴팁 크기를 측정해서 화면 밖으로 튀어나가지 않도록 보정
	const tooltipRef = useRef<HTMLDivElement | null>(null);
	const [tooltipSize, setTooltipSize] = useState<{ w: number; h: number }>({
		w: 360,
		h: 280,
	});

	useEffect(() => {
		if (!tooltip.visible) return;
		const raf = requestAnimationFrame(() => {
			const el = tooltipRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0) {
				setTooltipSize({ w: rect.width, h: rect.height });
			}
		});
		return () => cancelAnimationFrame(raf);
		// version이 바뀔 때만 크기 측정 (mousemove는 무시)
	}, [tooltip.visible, tooltip.version]);

	const tooltipPosition = useMemo(() => {
		if (!tooltip.visible) return null;

		const viewportW =
			typeof window !== 'undefined' ? window.innerWidth : 1024;
		const viewportH =
			typeof window !== 'undefined' ? window.innerHeight : 768;

		const tooltipW = tooltipSize.w || 360;
		const tooltipH = tooltipSize.h || 280;

		let left = tooltip.x + tooltip.offsetX;
		let top = tooltip.y + tooltip.offsetY;

		if (left + tooltipW > viewportW - 8) {
			left = Math.max(8, tooltip.x - tooltipW - tooltip.offsetX);
		}
		if (top + tooltipH > viewportH - 8) {
			top = Math.max(8, tooltip.y - tooltipH - tooltip.offsetY);
		}

		return { left, top };
	}, [
		tooltip.visible,
		tooltip.x,
		tooltip.y,
		tooltip.offsetX,
		tooltip.offsetY,
		tooltipSize,
	]);

	const isLoadingVisible = loading.activeKeys.length > 0;

	return (
		<>
			{isLoadingVisible ? (
				<LoadingOverlay message={loading.message ?? '불러오는 중...'} />
			) : null}

			{tooltip.visible && tooltipPosition ? (
				<div
					ref={tooltipRef}
					className='pointer-events-none fixed z-[60] max-w-[calc(100vw-16px)] max-h-[calc(100vh-16px)] overflow-y-auto'
					style={{
						left: tooltipPosition.left,
						top: tooltipPosition.top,
					}}
					aria-hidden='true'
				>
					{tooltip.content}
				</div>
			) : null}
		</>
	);
}
