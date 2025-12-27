/**
 * 검색 페이지 컴포넌트
 *
 * URL 쿼리 파라미터에서 검색어를 받아 OCID를 조회하고,
 * 조회 성공 시 캐릭터 상세 페이지로 자동 이동합니다.
 * 로딩 중이거나 에러 발생 시 적절한 UI를 표시합니다.
 */
import { Suspense } from 'react';
import SearchPageClient from './SearchPageClient';

export default function SearchPage() {
	return (
		<Suspense fallback={null}>
			<SearchPageClient />
		</Suspense>
	);
}
