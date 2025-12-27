/**
 * 검색 입력 컴포넌트
 *
 * 검색어를 입력받는 기본 input 컴포넌트입니다.
 * onChange와 onKeyDown 이벤트를 처리하여 검색 기능과 연동됩니다.
 */

import { ChangeEvent, KeyboardEvent, InputHTMLAttributes } from 'react';

export interface SearchInputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'onKeyDown'
	> {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

export function SearchInput({
	onChange,
	onKeyDown,
	placeholder = '닉네임 검색',
	className = '',
	...props
}: SearchInputProps) {
	return (
		<input
			type='text'
			className={`flex-grow min-w-0 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base font-medium ${className}`}
			onChange={onChange}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
			{...props}
		/>
	);
}
