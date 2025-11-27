/**
 * 카드 컴포넌트
 *
 * 정보를 담는 카드 형태의 컨테이너 컴포넌트입니다.
 * label을 통해 카드의 제목을 표시할 수 있습니다.
 */

import { ReactNode } from 'react';

export interface CardProps {
	label?: string;
	children: ReactNode;
	className?: string;
}

export function Card({ label, children, className = '' }: CardProps) {
	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className}`}
		>
			{label && (
				<h3 className='mb-4 text-lg font-semibold text-gray-800'>{label}</h3>
			)}
			{children}
		</div>
	);
}

