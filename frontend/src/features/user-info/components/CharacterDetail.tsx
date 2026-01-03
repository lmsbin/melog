/**
 * 캐릭터 상세 화면 엔트리 컴포넌트 (user-info 하위 모듈)
 * - 페이지(app router)에서는 view-model로 데이터만 가져오고, UI 조립은 여기서 담당합니다.
 */

'use client';

import { useState } from 'react';
import {
	CharacterDetailProps,
	CharacterDetailTabId,
	CharacterProfileCard,
	TabNavigation,
	Sidebar,
	PlaceholderPanel,
	StatsPanel,
	EquipmentPanel,
	SymbolPanel,
} from '@/features';

export function CharacterDetail(props: CharacterDetailProps) {
	const [activeTab, setActiveTab] = useState<CharacterDetailTabId>('stats');

	return (
		<div className='min-h-screen bg-[#f8f9fa]'>
			<div className='max-w-[1280px] mx-auto px-4 py-6'>
				<CharacterProfileCard
					isLoading={props.isLoading}
					userInfo={props.userInfo}
					userStatInfo={props.userStatInfo}
				/>

				<div className='flex gap-6 mt-6'>
					<div className='flex-1 min-w-0'>
						<TabNavigation
							activeTab={activeTab}
							onTabChange={setActiveTab}
						/>

						<div className='mt-4'>
							{activeTab === 'stats' && (
								<StatsPanel
									isLoading={props.isLoading}
									userStatInfo={props.userStatInfo}
									userHyperStatInfo={props.userHyperStatInfo}
								/>
							)}

							{activeTab === 'equipment' && (
								<EquipmentPanel
									isLoading={props.isLoading}
									itemEquipmentWithTooltip={
										props.itemEquipmentWithTooltip
									}
								/>
							)}

							{activeTab === 'symbols' && (
								<SymbolPanel
									isLoading={props.isLoading}
									userSymbolEquipment={
										props.userSymbolEquipment
									}
								/>
							)}

							{activeTab === 'skills' && (
								<PlaceholderPanel label='스킬' />
							)}
							{activeTab === 'union' && (
								<PlaceholderPanel label='유니온' />
							)}
						</div>
					</div>

					<Sidebar
						isLoading={props.isLoading}
						userInfo={props.userInfo}
						userAbility={props.userAbility}
					/>
				</div>
			</div>
		</div>
	);
}
