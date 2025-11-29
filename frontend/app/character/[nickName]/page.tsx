/**
 * 캐릭터 상세 페이지 컴포넌트
 *
 * URL 파라미터에서 닉네임을 받아 OCID를 조회하고,
 * 해당 캐릭터의 상세 정보를 표시하는 페이지입니다.
 * 여러 유저 정보 API를 병렬로 호출하여 효율적으로 데이터를 가져옵니다.
 */

'use client';

import { useParams } from 'next/navigation';
import { useCharacterPageViewModel } from '@/page/character/view-model/viewModel';
import {
	UserInfoCard,
	UserPropensityCard,
	UserAbilityCard,
	UserSymbolCard,
} from '@/features/user-info/components';
import { SearchBar } from '@/features/search/components';
import { Loading } from '@/shared/components/widget';
import { Card } from '@/shared/components/widget';

export default function CharacterPage() {
	const params = useParams();
	const nickName = params.nickName as string;

	// 페이지 ViewModel을 통해 OCID 및 유저 정보 조회 로직을 캡슐화
	const {
		ocid,
		ocidError,
		isLoading,
		queries: {
			userStatInfo,
			userHyperStatInfo,
			userItemEquipment,
		},
	} = useCharacterPageViewModel({ nickName });

	if (ocidError) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-24'>
				<SearchBar />
				<div className='mt-8 text-center'>
					<p className='text-red-500 text-lg font-semibold'>
						캐릭터를 찾을 수 없습니다
					</p>
					<p className='text-gray-600 mt-2'>{nickName}</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-24'>
				<SearchBar />
				<Loading />
			</div>
		);
	}

	return (
		<div className='flex w-full min-w-[1024px] flex-col items-center gap-8 pb-12'>
			<div className='w-full max-w-7xl px-4'>
				<SearchBar />
			</div>

			{/* 기본 정보 영역 */}
			<div className='flex w-full max-w-7xl gap-6 px-4'>
				<div className='flex flex-1'>
					<UserInfoCard ocid={ocid} />
				</div>
				<div className='flex flex-1'>
					<UserPropensityCard ocid={ocid} />
				</div>
				<div className='flex flex-1'>
					<UserAbilityCard ocid={ocid} />
				</div>
			</div>

			{/* 심볼 */}
			<div className='w-full max-w-7xl px-4'>
				<UserSymbolCard ocid={ocid} />
			</div>

			{/* 스탯 */}
			<div className='w-full max-w-7xl px-4'>
				<Card label='스탯'>
					{userStatInfo?.data && (
						<div className='space-y-2'>
							{userStatInfo.data.final_stat.slice(0, 10).map((stat, index) => (
								<div key={index} className='flex justify-between'>
									<span className='text-sm text-gray-600'>{stat.stat_name}</span>
									<span className='text-sm font-medium text-gray-900'>
										{stat.stat_value}
									</span>
								</div>
							))}
						</div>
					)}
				</Card>
			</div>

			{/* 하이퍼스탯 */}
			<div className='w-full max-w-7xl px-4'>
				<Card label='하이퍼스탯'>
					{userHyperStatInfo?.data && (
						<div className='space-y-4'>
							<div>
								<h4 className='mb-2 text-sm font-semibold text-gray-700'>
									프리셋 1 (남은 포인트: {userHyperStatInfo.data.hyper_stat_preset_1_remain_point})
								</h4>
								<div className='space-y-1'>
									{userHyperStatInfo.data.hyper_stat_preset_1.slice(0, 5).map((stat, index) => (
										<div key={index} className='flex justify-between text-sm'>
											<span className='text-gray-600'>{stat.stat_type}</span>
											<span className='font-medium text-gray-900'>
												Lv.{stat.stat_level} (+{stat.stat_increase})
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</Card>
			</div>

			{/* 장비 */}
			<div className='w-full max-w-7xl px-4'>
				<Card label='장비'>
					{userItemEquipment?.data && (
						<div className='space-y-2'>
							{userItemEquipment.data.item_equipment.slice(0, 10).map((item, index) => (
								<div key={index} className='flex items-center gap-3 border-b border-gray-100 pb-2'>
									{item.item_icon && (
										<img
											src={item.item_icon}
											alt={item.item_name}
											className='h-8 w-8'
										/>
									)}
									<div className='flex-1'>
										<div className='text-sm font-medium text-gray-900'>
											{item.item_name}
										</div>
										<div className='text-xs text-gray-500'>
											{item.item_equipment_part}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</Card>
			</div>
		</div>
	);
}

