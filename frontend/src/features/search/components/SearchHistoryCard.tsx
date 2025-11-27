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
	const { searchHistory, removeSearchHistory } = useSearchHistory();
	const router = useRouter();

	if (searchHistory.length === 0) {
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
		<div className='mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
			<h3 className='text-sm font-semibold text-gray-700 mb-2'>
				최근 검색
			</h3>
			<div className='space-y-2'>
				{searchHistory.map((item) => (
					<div
						key={item.nickName}
						className='flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors'
						onClick={() => handleClick(item.nickName)}
					>
						<span className='text-gray-800'>{item.nickName}</span>
						<button
							type='button'
							onClick={(e) => handleRemove(e, item.nickName)}
							className='text-gray-400 hover:text-red-500 transition-colors'
						>
							×
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
