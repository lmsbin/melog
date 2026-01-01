/**
 * 캐릭터 상세 탭 네비게이션
 */

'use client';

import {
	CHARACTER_DETAIL_TABS,
	type CharacterDetailTabId,
} from '@/features/user-info/character-detail/types';

export function TabNavigation({
	activeTab,
	onTabChange,
}: {
	activeTab: CharacterDetailTabId;
	onTabChange: (tab: CharacterDetailTabId) => void;
}) {
	return (
		<div className='bg-white border-b border-gray-200'>
			<div className='flex gap-1'>
				{CHARACTER_DETAIL_TABS.map((tab) => (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={`px-6 py-3 font-medium text-sm transition relative ${
							activeTab === tab.id
								? 'text-blue-600'
								: 'text-gray-600 hover:text-gray-900'
						}`}
						type='button'
					>
						{tab.label}
						{activeTab === tab.id && (
							<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600' />
						)}
					</button>
				))}
			</div>
		</div>
	);
}


