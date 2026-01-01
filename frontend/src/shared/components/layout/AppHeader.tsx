/**
 * 전역 공통 헤더
 *
 * - 모든 페이지에서 공통으로 노출되는 상단 헤더입니다.
 * - 우상단 검색창은 헤더 내부에 고정되어 있으며, `useSearch` 훅으로 동작합니다.
 */

'use client';

import Link from 'next/link';
import { useSearch } from '@/features/search/hooks/useSearch';
import { SearchIcon } from '@/shared/components/icons';

export function AppHeader() {
	const { searchValue, onChange, onClick, onKeyDown } = useSearch();

	return (
		<header className='bg-white border-b border-gray-200 sticky top-0 z-40'>
			<div className='max-w-[1280px] mx-auto px-4'>
				<div className='flex items-center justify-between h-16 gap-4'>
					<div className='flex items-center gap-8'>
						<Link
							href='/'
							className='text-xl font-bold text-gray-900'
						>
							MELOG<span className='text-blue-600'>.GG</span>
						</Link>

						<nav className='hidden md:flex items-center gap-6'>
							<Link
								href='/'
								className='text-sm font-medium text-gray-900 hover:text-blue-600 transition'
							>
								캐릭터 검색
							</Link>
							<span className='text-sm font-medium text-gray-400'>
								랭킹
							</span>
							<span className='text-sm font-medium text-gray-400'>
								길드
							</span>
							<span className='text-sm font-medium text-gray-400'>
								통계
							</span>
						</nav>
					</div>

					<div className='flex-1 max-w-md ml-auto'>
						<div className='flex items-center gap-2'>
							<div className='relative w-full'>
								<div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
									<SearchIcon />
								</div>
								<input
									type='text'
									placeholder='캐릭터 검색...'
									value={searchValue}
									onChange={onChange}
									onKeyDown={onKeyDown}
									className='w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder:text-gray-400'
								/>
							</div>
							<button
								type='button'
								onClick={onClick}
								className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition'
							>
								검색
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
