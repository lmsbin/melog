/**
 * LoadingOverlay 컴포넌트
 *
 * 화면 전체를 덮는 로딩 오버레이입니다.
 * 내부에서 `Spinner`를 사용하며, 메시지/접근성 라벨을 props로 제어합니다.
 */

import { HTMLAttributes } from 'react';
import { Spinner, SpinnerProps } from './Spinner';

export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * 사용자에게 보여줄 로딩 메시지
	 */
	message?: string;
	/**
	 * 스크린리더용 라벨
	 * @default "로딩 중"
	 */
	ariaLabel?: string;
	/**
	 * Spinner에 전달할 props
	 */
	spinnerProps?: SpinnerProps;
}

export function LoadingOverlay({
	message = '불러오는 중...',
	ariaLabel = '로딩 중',
	spinnerProps,
	className = '',
	...props
}: LoadingOverlayProps) {
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-[1px] ${className}`}
			aria-label={ariaLabel}
			role='status'
			aria-live='polite'
			{...props}
		>
			<div className='flex flex-col items-center gap-3 rounded-2xl bg-white/80 px-6 py-5 shadow-xl ring-1 ring-white/30'>
				<Spinner size={40} borderWidth={4} {...spinnerProps} />
				<p className='text-sm font-semibold text-gray-700'>{message}</p>
			</div>
		</div>
	);
}
