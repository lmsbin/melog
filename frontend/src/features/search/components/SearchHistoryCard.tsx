/**
 * 검색 기록 카드 컴포넌트
 *
 * 최근 검색한 닉네임 목록을 표시하는 컴포넌트입니다.
 * useSearchHistory hook을 사용하여 검색 기록을 가져오고 표시합니다.
 * 각 항목을 클릭하면 해당 닉네임으로 다시 검색할 수 있습니다.
 */

'use client';

import { useRouter } from 'next/navigation';
import { useSearchHistory } from '../hooks/useSearchHistory';

export function SearchHistoryCard() {
	const { searchHistory, isMounted, removeSearchHistory } =
		useSearchHistory();
	const router = useRouter();

	// 마운트되지 않았거나 검색 기록이 없으면 렌더링하지 않음
	if (!isMounted || searchHistory.length === 0) {
		return null;
	}

	const handleClick = (nickName: string) => {
		router.push(`/search?q=${encodeURIComponent(nickName)}`);
	};

	const handleRemove = (e: React.MouseEvent, nickName: string) => {
		e.stopPropagation();
		removeSearchHistory(nickName);
	};

	return (
		<div className='mt-6 p-5 bg-white/95 rounded-xl border border-white/20 shadow-lg'>
			<h3 className='text-base font-bold text-gray-800 mb-3 flex items-center gap-2'>
				<span className='text-lg'>🔍</span>
				최근 검색
			</h3>
			<div className='space-y-2'>
				{searchHistory.map((item) => (
					<div
						key={item.nickName}
						className='flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 hover:shadow-md border border-transparent hover:border-blue-200'
						onClick={() => handleClick(item.nickName)}
					>
						<span className='text-gray-800 font-medium'>
							{item.nickName}
						</span>
						<button
							type='button'
							onClick={(e) => handleRemove(e, item.nickName)}
							className='text-gray-400 hover:text-red-500 transition-colors text-xl font-bold leading-none w-6 h-6 flex items-center justify-center rounded hover:bg-red-50'
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
