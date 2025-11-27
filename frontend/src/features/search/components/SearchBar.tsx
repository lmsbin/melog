/**
 * 검색 바 컴포넌트
 *
 * 검색어를 입력하고 검색을 실행할 수 있는 검색 바 컴포넌트입니다.
 * useSearch hook을 사용하여 검색 입력값 관리와 네비게이션을 처리합니다.
 */

'use client';

import { SearchInput, SearchButton } from '@/shared/components/ui';
import { useSearch } from '../hooks/useSearch';

export function SearchBar() {
	const { searchValue, onChange, onClick, onKeyDown } = useSearch();

	return (
		<div className='flex min-w-[400px] items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md'>
			<SearchInput
				value={searchValue}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder='닉네임 검색'
			/>
			<SearchButton onClick={onClick} />
		</div>
	);
}
