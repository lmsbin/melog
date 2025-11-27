/**
 * 검색 입력 및 네비게이션 Hook
 *
 * 검색 입력값을 관리하고, 검색 버튼 클릭 또는 Enter 키 입력 시
 * 검색 페이지로 이동하는 로직을 담당합니다.
 * Next.js의 useRouter를 사용하여 클라이언트 사이드 네비게이션을 처리합니다.
 */

'use client';

import { useRouter } from 'next/navigation';
import {
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	useCallback,
	useState,
} from 'react';

export function useSearch() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');

	const searchAction = useCallback(() => {
		if (!searchValue.trim()) return;

		const searchURL = `/search?q=${encodeURIComponent(searchValue.trim())}`;
		router.push(searchURL);
	}, [searchValue, router]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				searchAction();
			}
		},
		[searchAction]
	);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	}, []);

	const onClick = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			searchAction();
		},
		[searchAction]
	);

	return {
		searchValue,
		onKeyDown,
		onClick,
		onChange,
	};
}
