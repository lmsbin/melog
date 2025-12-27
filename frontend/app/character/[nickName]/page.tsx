/**
 * 캐릭터 상세 페이지 컴포넌트
 *
 * URL 파라미터에서 닉네임을 받아 OCID를 조회하고,
 * 해당 캐릭터의 상세 정보를 표시하는 페이지입니다.
 * 여러 유저 정보 API를 병렬로 호출하여 효율적으로 데이터를 가져옵니다.
 */

'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCharacterPageViewModel } from '@/page/character/view-model/viewModel';
import {
	UserInfoCard,
	UserPropensityCard,
	UserAbilityCard,
	UserSymbolCard,
} from '@/features/user-info/components';
import { SearchBar } from '@/features/search/components';
import { Card } from '@/shared/components/widget';
import { LoadingOverlay } from '@/shared/components/ui';
import type {
	ItemEquipment,
	ItemOption,
} from '@/features/user-info/types/item-equipment';

type ItemTooltipState = {
	item: ItemEquipment;
	x: number;
	y: number;
};

function isMeaningfulValue(value: unknown) {
	if (value === null || value === undefined) return false;
	const s = String(value).trim();
	if (!s) return false;
	// API에서 "0", "0.0", "0.00" 등으로 오는 값은 표시하지 않음
	if (/^0+(\.0+)?$/.test(s)) return false;
	return true;
}

function buildOptionLines(option?: ItemOption) {
	if (!option) return [];

	const entries: Array<{
		label: string;
		value?: string | number;
		suffix?: string;
	}> = [
		{ label: 'STR', value: option.str },
		{ label: 'DEX', value: option.dex },
		{ label: 'INT', value: option.int },
		{ label: 'LUK', value: option.luk },
		{ label: 'HP', value: option.max_hp },
		{ label: 'MP', value: option.max_mp },
		{ label: '공격력', value: option.attack_power },
		{ label: '마력', value: option.magic_power },
		{ label: '방어력', value: option.armor },
		{ label: '이동속도', value: option.speed },
		{ label: '점프력', value: option.jump },
		{ label: '데미지', value: option.damage, suffix: '%' },
		{ label: '보스 데미지', value: option.boss_damage, suffix: '%' },
		{
			label: '방어율 무시',
			value: option.ignore_monster_armor,
			suffix: '%',
		},
		{ label: '올스탯', value: option.all_stat, suffix: '%' },
		{ label: 'HP%', value: option.max_hp_rate, suffix: '%' },
		{ label: 'MP%', value: option.max_mp_rate, suffix: '%' },
	];

	return entries
		.filter((e) => isMeaningfulValue(e.value))
		.map((e) => ({
			label: e.label,
			value: `${e.value}${e.suffix ?? ''}`,
		}));
}

export default function CharacterPage() {
	const params = useParams();
	const nickName = params.nickName as string;

	// 페이지 ViewModel을 통해 OCID 및 유저 정보 조회 로직을 캡슐화
	const {
		ocid,
		ocidError,
		isLoading: isPageLoading,
		isFetching: isPageFetching,
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

	const [itemTooltip, setItemTooltip] = useState<ItemTooltipState | null>(
		null
	);

	const tooltipPosition = useMemo(() => {
		if (!itemTooltip) return null;
		// 커서 기준으로 약간 띄워서 표시 (가려지지 않게)
		const offsetX = 16;
		const offsetY = 16;

		// 대략적인 툴팁 크기(클램프용). 실제 UI는 max-width/height로 제한.
		const tooltipW = 360;
		const tooltipH = 280;

		const viewportW =
			typeof window !== 'undefined' ? window.innerWidth : 1024;
		const viewportH =
			typeof window !== 'undefined' ? window.innerHeight : 768;

		let left = itemTooltip.x + offsetX;
		let top = itemTooltip.y + offsetY;

		if (left + tooltipW > viewportW - 8) {
			left = Math.max(8, itemTooltip.x - tooltipW - offsetX);
		}
		if (top + tooltipH > viewportH - 8) {
			top = Math.max(8, itemTooltip.y - tooltipH - offsetY);
		}

		return { left, top };
	}, [itemTooltip]);

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
			{/* 전체 로딩 오버레이 + 스피너: "로딩 중"임을 확실히 인지시키기 */}
			{isPageFetching ? (
				<LoadingOverlay message='캐릭터 정보를 불러오는 중...' />
			) : null}

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
										className='flex items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-200 hover:shadow-sm'
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
												className='flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3 text-sm transition-all duration-200 hover:shadow-sm'
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
								{userItemEquipment.data.item_equipment
									.slice(0, 10)
									.map((item, index) => (
										<div
											key={index}
											className='flex items-center gap-3 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-3 transition-all duration-200 hover:shadow-md hover:border-blue-300'
											onMouseEnter={(e) => {
												setItemTooltip({
													item,
													x: e.clientX,
													y: e.clientY,
												});
											}}
											onMouseMove={(e) => {
												setItemTooltip((prev) =>
													prev
														? {
																...prev,
																x: e.clientX,
																y: e.clientY,
														  }
														: {
																item,
																x: e.clientX,
																y: e.clientY,
														  }
												);
											}}
											onMouseLeave={() =>
												setItemTooltip(null)
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

							{/* 마우스 위치 기준 툴팁 */}
							{itemTooltip && tooltipPosition ? (
								<div
									className='pointer-events-none fixed z-50 w-[360px] max-w-[calc(100vw-16px)] rounded-xl border border-white/20 bg-gray-900/70 p-3 text-white shadow-2xl backdrop-blur-md'
									style={{
										left: tooltipPosition.left,
										top: tooltipPosition.top,
									}}
									aria-hidden='true'
								>
									<div className='flex items-start gap-3'>
										{itemTooltip.item.item_icon ? (
											<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15'>
												<img
													src={
														itemTooltip.item
															.item_icon
													}
													alt={
														itemTooltip.item
															.item_name
													}
													className='h-10 w-10'
												/>
											</div>
										) : null}

										<div className='min-w-0 flex-1'>
											<div className='truncate text-sm font-extrabold'>
												{itemTooltip.item.item_name}
											</div>
											<div className='mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/80'>
												<span className='rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/10'>
													{
														itemTooltip.item
															.item_equipment_part
													}
												</span>
												<span className='rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/10'>
													슬롯:{' '}
													{
														itemTooltip.item
															.item_equipment_slot
													}
												</span>
												{itemTooltip.item.starforce ? (
													<span className='rounded-full bg-yellow-400/15 px-2 py-0.5 font-extrabold text-yellow-200 ring-1 ring-yellow-200/20'>
														★{' '}
														{
															itemTooltip.item
																.starforce
														}
													</span>
												) : null}
											</div>
										</div>
									</div>

									{/* 옵션(총합) */}
									{buildOptionLines(
										itemTooltip.item.item_total_option
									).length > 0 ? (
										<div className='mt-3'>
											<div className='mb-1 text-xs font-extrabold text-white/90'>
												옵션(총합)
											</div>
											<div className='grid grid-cols-2 gap-x-3 gap-y-1 text-[12px]'>
												{buildOptionLines(
													itemTooltip.item
														.item_total_option
												).map((line) => (
													<div
														key={line.label}
														className='flex items-center justify-between gap-2'
													>
														<span className='text-white/70'>
															{line.label}
														</span>
														<span className='font-bold text-white'>
															{line.value}
														</span>
													</div>
												))}
											</div>
										</div>
									) : null}

									{/* 잠재/에디셔널 */}
									<div className='mt-3 grid grid-cols-1 gap-2'>
										{itemTooltip.item
											.potential_option_grade ? (
											<div className='rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
												<div className='text-xs font-extrabold text-white/90'>
													잠재 (
													{
														itemTooltip.item
															.potential_option_grade
													}
													)
												</div>
												<ul className='mt-1 space-y-0.5 text-[12px] text-white/85'>
													{[
														itemTooltip.item
															.potential_option_1,
														itemTooltip.item
															.potential_option_2,
														itemTooltip.item
															.potential_option_3,
													]
														.filter(Boolean)
														.map((v, i) => (
															<li
																key={i}
																className='truncate'
															>
																- {v}
															</li>
														))}
												</ul>
											</div>
										) : null}

										{itemTooltip.item
											.additional_potential_option_grade ? (
											<div className='rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
												<div className='text-xs font-extrabold text-white/90'>
													에디셔널 (
													{
														itemTooltip.item
															.additional_potential_option_grade
													}
													)
												</div>
												<ul className='mt-1 space-y-0.5 text-[12px] text-white/85'>
													{[
														itemTooltip.item
															.additional_potential_option_1,
														itemTooltip.item
															.additional_potential_option_2,
														itemTooltip.item
															.additional_potential_option_3,
													]
														.filter(Boolean)
														.map((v, i) => (
															<li
																key={i}
																className='truncate'
															>
																- {v}
															</li>
														))}
												</ul>
											</div>
										) : null}
									</div>

									{/* 소울 */}
									{itemTooltip.item.soul_name ||
									itemTooltip.item.soul_option ? (
										<div className='mt-3 rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
											<div className='text-xs font-extrabold text-white/90'>
												소울
											</div>
											<div className='mt-1 text-[12px] text-white/85'>
												{itemTooltip.item.soul_name ? (
													<div className='truncate'>
														-{' '}
														{
															itemTooltip.item
																.soul_name
														}
													</div>
												) : null}
												{itemTooltip.item
													.soul_option ? (
													<div className='truncate'>
														-{' '}
														{
															itemTooltip.item
																.soul_option
														}
													</div>
												) : null}
											</div>
										</div>
									) : null}
								</div>
							) : null}
						</>
					)}
				</Card>
			</div>
		</div>
	);
}
