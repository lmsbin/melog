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
			className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${className}`}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}
