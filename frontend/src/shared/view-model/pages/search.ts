/**
 * search 페이지 ViewModel step 정의
 *
 * 컴포넌트에서는 useViewModel('search')만 호출하고,
 * - URL 쿼리 파라미터 읽기
 * - OCID 조회
 * - 성공 시 redirect + 검색 기록 저장
 * 을 ViewModel 내부에서 처리합니다.
 */

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchHistory } from '@/features/recent-searches';
import { useOcid } from '@/features/search/hooks/useOcid';

export function useSearchFetchStep() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchedValue = searchParams.get('q');
	const ocidQuery = useOcid(searchedValue);

	return { router, searchedValue, ocidQuery };
}

export function useSearchTransformStep(
	fetched: ReturnType<typeof useSearchFetchStep>
) {
	const { addSearchHistory } = useSearchHistory();

	useEffect(() => {
		if (fetched.ocidQuery.data?.ocid && fetched.searchedValue) {
			addSearchHistory({
				nickName: fetched.searchedValue,
				searchedAt: Date.now(),
			});

			fetched.router.replace(
				`/character/${encodeURIComponent(fetched.searchedValue)}`
			);
		}
	}, [
		fetched.ocidQuery.data?.ocid,
		fetched.searchedValue,
		fetched.router,
		addSearchHistory,
	]);

	return {
		searchedValue: fetched.searchedValue,
		ocidQuery: fetched.ocidQuery,
	};
}
