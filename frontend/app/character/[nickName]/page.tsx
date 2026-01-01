/**
 * 캐릭터 상세 페이지 컴포넌트
 *
 * URL 파라미터에서 닉네임을 받아 OCID를 조회하고,
 * 해당 캐릭터의 상세 정보를 표시하는 페이지입니다.
 * 여러 유저 정보 API를 병렬로 호출하여 효율적으로 데이터를 가져옵니다.
 */

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCharacterPageViewModel } from '@/page/character/view-model/viewModel';
import { CharacterDetail } from '@/features/user-info/character-detail/components';
import { SearchBar } from '@/features/search/components';
import { ui } from '@/shared/ui-controller';

export default function CharacterPage() {
	const params = useParams();
	const nickName = params.nickName as string;

	// 페이지 ViewModel을 통해 OCID 및 유저 정보 조회 로직을 캡슐화
	const {
		ocidError,
		isLoading: isPageLoading,
		isFetching: isPageFetching,
		models: { itemEquipmentWithTooltip },
		queries: {
			userInfo,
			userAbility,
			userSymbolEquipment,
			userStatInfo,
			userHyperStatInfo,
			userItemEquipment,
		},
	} = useCharacterPageViewModel({ nickName });

	useEffect(() => {
		// 전역 로딩 오버레이: 페이지 fetching 상태를 공통 UI로 표시
		ui.loading.set(
			'character-page',
			isPageFetching,
			'캐릭터 정보를 불러오는 중...'
		);
		return () => {
			// 라우트 변경/언마운트 시 안전하게 해제
			ui.loading.set('character-page', false);
			ui.tooltip.hide();
		};
	}, [isPageFetching]);

	if (ocidError) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-24'>
				<div className='w-full max-w-3xl'>
					<SearchBar />
				</div>
				<div className='mt-8 text-center bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20'>
					<p className='text-red-500 text-xl font-bold mb-2'>
						캐릭터를 찾을 수 없습니다
					</p>
					<p className='text-gray-600 mt-2 font-medium'>{nickName}</p>
				</div>
			</div>
		);
	}

	return (
		<CharacterDetail
			nickName={nickName}
			isLoading={isPageLoading}
			userInfo={userInfo.data ?? null}
			userStatInfo={userStatInfo.data ?? null}
			userAbility={userAbility.data ?? null}
			userHyperStatInfo={userHyperStatInfo.data ?? null}
			userItemEquipment={userItemEquipment.data ?? null}
			userSymbolEquipment={userSymbolEquipment.data ?? null}
			itemEquipmentWithTooltip={itemEquipmentWithTooltip}
		/>
	);
}
