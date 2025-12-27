/**
 * Spinner 컴포넌트
 *
 * 로딩 상태를 시각적으로 보여주는 공용 스피너입니다.
 * 오버레이/버튼/섹션 등 다양한 곳에서 재사용할 수 있도록 최소한의 스타일만 제공합니다.
 */

import { CSSProperties, HTMLAttributes } from 'react';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * 스피너 크기(px)
	 * @default 40
	 */
	size?: number;
	/**
	 * 테두리 두께(px)
	 * @default 4
	 */
	borderWidth?: number;
}

export function Spinner({
	size = 40,
	borderWidth = 4,
	className = '',
	style,
	...props
}: SpinnerProps) {
	const spinnerStyle: CSSProperties = {
		width: size,
		height: size,
		borderWidth,
		...style,
	};

	return (
		<div
			aria-hidden='true'
			className={`animate-spin rounded-full border-solid border-gray-300 border-t-blue-500 ${className}`}
			style={spinnerStyle}
			{...props}
		/>
	);
}
