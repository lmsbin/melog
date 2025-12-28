/**
 * 검색 페이지 Client 컴포넌트
 *
 * `useSearchParams` 등 Client Hook을 사용하는 로직을 분리합니다.
 * (Next.js 빌드 시 /search 페이지 프리렌더 단계에서 Suspense 경고/에러를 피하기 위함)
 */

'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchHistory } from '@/features/recent-searches';
import { useSearchPageViewModel } from '@/page/search/view-model/viewModel';
import { SearchBar } from '@/features/search/components';
import { SearchHistoryCard } from '@/features/recent-searches';

export default function SearchPageClient() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchedValue = searchParams.get('q');
	const { addSearchHistory } = useSearchHistory();

	// 페이지 ViewModel을 통해 OCID 조회 로직을 캡슐화
	const { ocidQuery } = useSearchPageViewModel({ searchedValue });

	const { data: ocidData, isLoading, isError, error } = ocidQuery;

	// OCID 조회 성공 시 캐릭터 페이지로 이동
	useEffect(() => {
		if (ocidData?.ocid && searchedValue) {
			// 검색 기록에 추가
			addSearchHistory({
				nickName: searchedValue,
				searchedAt: Date.now(),
			});

			// 캐릭터 페이지로 이동
			router.replace(`/character/${encodeURIComponent(searchedValue)}`);
		}
	}, [ocidData?.ocid, searchedValue, router, addSearchHistory]);

	// 검색어가 없을 때
	if (!searchedValue) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-24'>
				<div className='text-center mb-12'>
					<h1 className='text-6xl font-bold mb-4 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg'>
						메이플스토리
					</h1>
					<p className='text-white/90 text-lg font-medium'>
						캐릭터 정보 조회
					</p>
				</div>
				<SearchBar />
				<SearchHistoryCard />
			</div>
		);
	}

	// 에러 발생
	if (isError) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-24'>
				<SearchBar />
				<div className='mt-8 text-center bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20'>
					<p className='text-red-500 text-xl font-bold mb-2'>
						검색 중 오류가 발생했습니다
					</p>
					<p className='text-gray-600 mt-2 font-medium'>
						{error instanceof Error
							? error.message
							: '알 수 없는 오류'}
					</p>
				</div>
			</div>
		);
	}

	// 로딩 중이거나 OCID 조회 중일 때는 아무 UI도 출력하지 않음
	// (OCID 조회 완료되면 useEffect에서 바로 캐릭터 페이지로 이동)
	if (isLoading || !ocidData?.ocid) {
		return null;
	}

	// OCID 조회 완료되었지만 아직 이동하지 않은 경우 (거의 발생하지 않음)
	return null;
}
