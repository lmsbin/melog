/**
 * 검색 페이지 ViewModel
 *
 * - URL 쿼리로부터 전달받은 검색어를 기반으로 OCID를 조회합니다.
 * - View에서는 이 ViewModel이 제공하는 데이터/상태를 활용해
 *   로딩 / 에러 / 결과 대기 등의 화면을 렌더링할 수 있습니다.
 *
 * 주의:
 * - 라우팅 이동, 검색 기록 추가 등 유저 액션/사이드이펙트 관련 로직은
 *   현재 단계에서는 포함하지 않고, OCID 조회(fetch) 관련 로직만 다룹니다.
 */

import { useOcid } from '@/features/search/hooks/useOcid';

type UseSearchPageViewModelParams = {
	/**
	 * URL 쿼리로부터 전달된 검색어
	 */
	searchedValue: string | null;
};

export function useSearchPageViewModel({
	searchedValue,
}: UseSearchPageViewModelParams) {
	const ocidQuery = useOcid(searchedValue);

	return {
		searchedValue,
		ocidQuery,
	};
}
