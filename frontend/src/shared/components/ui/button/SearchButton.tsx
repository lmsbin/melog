/**
 * 검색 버튼 컴포넌트
 *
 * 검색을 실행하는 버튼 컴포넌트입니다.
 * 클릭 시 검색 액션을 실행합니다.
 */

import { MouseEvent, ButtonHTMLAttributes } from 'react';

export interface SearchButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function SearchButton({
	onClick,
	className = '',
	children = '검색',
	...props
}: SearchButtonProps) {
	return (
		<button
			type='button'
			className={`ml-3 min-w-[72px] whitespace-nowrap break-keep px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${className}`}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}
