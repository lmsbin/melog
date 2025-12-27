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
import {
	UserInfoCard,
	UserPropensityCard,
	UserAbilityCard,
	UserSymbolCard,
	ItemEquipmentTooltip,
} from '@/features/user-info/components';
import { SearchBar } from '@/features/search/components';
import { Card } from '@/shared/components/widget';
import { ui } from '@/shared/ui-controller';

export default function CharacterPage() {
	const params = useParams();
	const nickName = params.nickName as string;

	// 페이지 ViewModel을 통해 OCID 및 유저 정보 조회 로직을 캡슐화
	const {
		ocid,
		ocidError,
		isLoading: isPageLoading,
		isFetching: isPageFetching,
		models: { itemEquipmentWithTooltip },
		queries: {
			userInfo,
			userPropensity,
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
				<SearchBar />
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
		<div className='flex w-full min-w-[1024px] flex-col items-center gap-8 pb-12 pt-8'>
			<div className='w-full max-w-7xl px-4'>
				<SearchBar />
			</div>

			{/* 기본 정보 영역 */}
			<div className='flex w-full max-w-7xl gap-4 px-4'>
				<div className='flex flex-1 w-full'>
					{isPageLoading ? (
						<UserInfoCard.Skeleton />
					) : (
						<UserInfoCard userInfo={userInfo.data ?? null} />
					)}
				</div>
				<div className='flex flex-1 w-full'>
					{isPageLoading ? (
						<UserPropensityCard.Skeleton />
					) : (
						<UserPropensityCard
							propensity={userPropensity.data ?? null}
						/>
					)}
				</div>
				<div className='flex flex-1 w-full'>
					{isPageLoading ? (
						<UserAbilityCard.Skeleton />
					) : (
						<UserAbilityCard ability={userAbility.data ?? null} />
					)}
				</div>
			</div>

			{/* 심볼 */}
			<div className='w-full max-w-7xl px-4'>
				{isPageLoading ? (
					<UserSymbolCard.Skeleton />
				) : (
					<UserSymbolCard
						symbolEquipment={userSymbolEquipment.data ?? null}
					/>
				)}
			</div>

			{/* 스탯 */}
			<div className='w-full max-w-7xl px-4'>
				<Card label='스탯'>
					{isPageLoading || !userStatInfo?.data ? (
						<div className='space-y-2 animate-pulse'>
							{Array.from({ length: 10 }).map((_, index) => (
								<div
									key={index}
									className='flex justify-between'
								>
									<div className='h-4 w-24 rounded bg-gray-100' />
									<div className='h-4 w-16 rounded bg-gray-100' />
								</div>
							))}
						</div>
					) : (
						<div className='space-y-2.5'>
							{userStatInfo.data.final_stat
								.slice(0, 10)
								.map((stat, index) => (
									<div
										key={index}
										className='flex items-center justify-between rounded-lg bg-linear-to-r from-gray-50 to-white p-3 transition-all duration-200 hover:shadow-sm'
									>
										<span className='text-sm font-medium text-gray-700'>
											{stat.stat_name}
										</span>
										<span className='text-sm font-bold text-gray-900'>
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
					{isPageLoading || !userHyperStatInfo?.data ? (
						<div className='space-y-4 animate-pulse'>
							<div>
								<div className='mb-2 h-4 w-64 rounded bg-gray-100' />
								<div className='space-y-1'>
									{Array.from({ length: 5 }).map(
										(_, index) => (
											<div
												key={index}
												className='flex justify-between text-sm'
											>
												<div className='h-4 w-24 rounded bg-gray-100' />
												<div className='h-4 w-32 rounded bg-gray-100' />
											</div>
										)
									)}
								</div>
							</div>
						</div>
					) : (
						<div className='space-y-4'>
							<div>
								<h4 className='mb-2 text-sm font-semibold text-gray-700'>
									프리셋 1 (남은 포인트:{' '}
									{
										userHyperStatInfo.data
											.hyper_stat_preset_1_remain_point
									}
									)
								</h4>
								<div className='space-y-2'>
									{userHyperStatInfo.data.hyper_stat_preset_1
										.slice(0, 5)
										.map((stat, index) => (
											<div
												key={index}
												className='flex items-center justify-between rounded-lg bg-linear-to-r from-blue-50 to-purple-50 p-3 text-sm transition-all duration-200 hover:shadow-sm'
											>
												<span className='font-medium text-gray-700'>
													{stat.stat_type}
												</span>
												<span className='font-bold text-blue-600'>
													Lv.{stat.stat_level} (+
													{stat.stat_increase})
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
					{isPageLoading || !userItemEquipment?.data ? (
						<div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2 animate-pulse'>
							{Array.from({ length: 10 }).map((_, index) => (
								<div
									key={index}
									className='flex items-center gap-3 rounded-lg border border-gray-100 bg-white/60 p-3'
								>
									<div className='h-10 w-10 rounded bg-gray-100' />
									<div className='flex-1 space-y-1'>
										<div className='h-4 w-40 rounded bg-gray-100' />
										<div className='h-3 w-24 rounded bg-gray-100' />
									</div>
								</div>
							))}
						</div>
					) : (
						<>
							<div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
								{itemEquipmentWithTooltip
									.slice(0, 10)
									.map(({ item, tooltip }, index) => (
										<div
											key={index}
											className='flex items-center gap-3 rounded-lg border border-gray-200 bg-linear-to-r from-white to-gray-50 p-3 transition-all duration-200 hover:shadow-md hover:border-blue-300'
											onMouseEnter={(e) => {
												// 전역 툴팁 표시
												ui.tooltip.show({
													x: e.clientX,
													y: e.clientY,
													content: (
														<ItemEquipmentTooltip
															vm={tooltip}
														/>
													),
												});
											}}
											onMouseMove={(e) => {
												ui.tooltip.move(
													e.clientX,
													e.clientY
												);
											}}
											onMouseLeave={() =>
												ui.tooltip.hide()
											}
										>
											{item.item_icon && (
												<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200'>
													<img
														src={item.item_icon}
														alt={item.item_name}
														className='h-8 w-8'
													/>
												</div>
											)}
											<div className='flex-1'>
												<div className='text-sm font-semibold text-gray-900'>
													{item.item_name}
												</div>
												<div className='text-xs text-gray-500'>
													{item.item_equipment_part}
												</div>
											</div>
										</div>
									))}
							</div>
						</>
					)}
				</Card>
			</div>
		</div>
	);
}
