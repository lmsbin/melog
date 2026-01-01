/**
 * 홈 페이지 컴포넌트
 *
 * 루트 경로(/)에 해당하는 메인 페이지입니다.
 * Next.js App Router의 파일 기반 라우팅에 따라 app/page.tsx 파일이 루트 경로를 담당합니다.
 * 검색 바와 검색 기록을 표시하여 사용자가 바로 검색을 시작할 수 있도록 합니다.
 */

'use client';

import { SearchBar } from '@/features';
import { SearchHistoryCard } from '@/features/recent-searches';
import { useHomePageViewModel } from '@/page/home/view-model/viewModel';

export default function HomePage() {
	useHomePageViewModel();

	return (
		<main className='min-h-screen flex items-center justify-center px-4 py-12'>
			<section className='w-full max-w-3xl'>
				{/* 히어로 영역: 서비스 타이틀 및 설명 */}
				<header className='text-center mb-10'>
					<p className='mb-2 text-xs font-semibold tracking-[0.35em] text-white/60 uppercase'>
						MAPLESTORY CHARACTER FINDER
					</p>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_18px_45px_rgba(15,23,42,0.65)]'>
						MELOG
					</h1>
				</header>

				{/* 검색 카드: 검색창 + 최근 검색 기록 */}
				<section className='backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_22px_65px_rgba(15,23,42,0.75)] p-5 md:p-8 space-y-6'>
					<SearchBar />
					<SearchHistoryCard />
				</section>
			</section>
		</main>
	);
}
