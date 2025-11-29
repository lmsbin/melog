/**
 * 홈 페이지 컴포넌트
 *
 * 루트 경로(/)에 해당하는 메인 페이지입니다.
 * Next.js App Router의 파일 기반 라우팅에 따라 app/page.tsx 파일이 루트 경로를 담당합니다.
 * 검색 바와 검색 기록을 표시하여 사용자가 바로 검색을 시작할 수 있도록 합니다.
 */

'use client';

import { SearchBar, SearchHistoryCard } from '@/features/search/components';
import { useHomePageViewModel } from '@/page/home/view-model/viewModel';

export default function HomePage() {
	// 현재는 별도 데이터 fetch가 없지만, 추후 확장을 고려해 ViewModel을 호출합니다.
	useHomePageViewModel();

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='text-center mb-8'>
				<h1 className='text-4xl font-bold mb-4'>Welcome</h1>
				<p className='text-gray-600'>
					Next.js + TanStack Query 프로젝트
				</p>
			</div>
			<SearchBar />
			<SearchHistoryCard />
		</main>
	);
}
