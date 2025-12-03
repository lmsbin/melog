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
			className={`w-full rounded-xl border border-white/20 bg-white/95 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white ${className}`}
		>
			{label && (
				<h3 className='mb-4 text-xl font-bold text-gray-800 border-b border-gray-200 pb-2'>
					{label}
				</h3>
			)}
			{children}
		</div>
	);
}

