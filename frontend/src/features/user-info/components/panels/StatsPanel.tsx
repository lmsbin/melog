/**
 * 스탯 탭 패널
 * - 원천 데이터는 view-model에서 내려온 userStatInfo/userHyperStatInfo를 사용합니다.
 */

'use client';

import { useMemo, useState } from 'react';
import type { UserHyperStatInfo } from '@/features/user-info/types/hyper-stat';
import type { UserStatInfo } from '@/features/user-info/types/stat';
import { formatStatValue, pickStatValue } from '@/features';

export function StatsPanel({
	isLoading,
	userStatInfo,
	userHyperStatInfo,
}: {
	isLoading: boolean;
	userStatInfo: UserStatInfo | null;
	userHyperStatInfo: UserHyperStatInfo | null;
}) {
	type HighlightStatRow = {
		label: string;
		value: string;
		highlight: boolean;
	};

	const mainStats = useMemo(() => {
		const map = [
			{ label: '최소 스탯공격력', key: '최소 스탯공격력' },
			{ label: '최대 스탯공격력', key: '최대 스탯공격력' },
			{ label: '데미지', key: '데미지' },
			{ label: '보스 몬스터 데미지', key: '보스 몬스터 공격 시 데미지' },
			{ label: '최종 데미지', key: '최종 데미지' },
			{ label: '방어율 무시', key: '몬스터 방어율 무시' },
		] as const;
		return map.map((m) => {
			const v = pickStatValue(userStatInfo, m.key);
			return {
				label: m.label,
				value: v ? formatStatValue(m.key, v) : '—',
			};
		});
	}, [userStatInfo]);

	const combatStats = useMemo(() => {
		const map = [
			{ label: '크리티컬 확률', key: '크리티컬 확률', highlight: true },
			{
				label: '크리티컬 데미지',
				key: '크리티컬 데미지',
				highlight: true,
			},
			{ label: '상태이상 내성', key: '상태이상 내성' },
			{ label: '스탠스', key: '스탠스', highlight: true },
		] as const;

		return map.map((m): HighlightStatRow => {
			const v = pickStatValue(userStatInfo, m.key);
			return {
				label: m.label,
				value: v ? formatStatValue(m.key, v) : '—',
				highlight: 'highlight' in m ? Boolean(m.highlight) : false,
			};
		});
	}, [userStatInfo]);

	const basicStats = useMemo(() => {
		const map = [
			{ label: 'STR', key: 'STR' },
			{ label: 'DEX', key: 'DEX' },
			{ label: 'INT', key: 'INT', highlight: true },
			{ label: 'LUK', key: 'LUK' },
			{ label: 'HP', key: 'HP' },
			{ label: 'MP', key: 'MP' },
		] as const;

		return map.map((m): HighlightStatRow => {
			const v =
				pickStatValue(userStatInfo, m.key) ??
				(m.key === 'HP'
					? pickStatValue(userStatInfo, '최대 HP')
					: m.key === 'MP'
					? pickStatValue(userStatInfo, '최대 MP')
					: null);
			return {
				label: m.label,
				value: v ? formatStatValue(m.key, v) : '—',
				highlight: 'highlight' in m ? Boolean(m.highlight) : false,
			};
		});
	}, [userStatInfo]);

	const [preset, setPreset] = useState<1 | 2 | 3>(1);
	const hyper = useMemo(() => {
		if (!userHyperStatInfo) return null;
		if (preset === 1)
			return {
				details: userHyperStatInfo.hyper_stat_preset_1,
				remain: userHyperStatInfo.hyper_stat_preset_1_remain_point,
			};
		if (preset === 2)
			return {
				details: userHyperStatInfo.hyper_stat_preset_2,
				remain: userHyperStatInfo.hyper_stat_preset_2_remain_point,
			};
		return {
			details: userHyperStatInfo.hyper_stat_preset_3,
			remain: userHyperStatInfo.hyper_stat_preset_3_remain_point,
		};
	}, [userHyperStatInfo, preset]);

	return (
		<div className='space-y-4'>
			<div className='bg-white rounded-lg border border-gray-200 p-6'>
				<h3 className='text-lg font-bold text-gray-900 mb-4'>
					전투 스탯
				</h3>
				<div className='grid grid-cols-2 gap-4'>
					{(isLoading
						? Array.from({ length: 6 }).map((_, i) => ({
								label: `loading-${i}`,
								value: '—',
						  }))
						: mainStats
					).map((stat) => (
						<div
							key={stat.label}
							className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
						>
							<span className='text-sm text-gray-600'>
								{stat.label}
							</span>
							<span className='text-sm font-bold text-gray-900'>
								{stat.value}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div className='bg-white rounded-lg border border-gray-200 p-6'>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>
						크리티컬
					</h3>
					<div className='space-y-3'>
						{(isLoading
							? Array.from({ length: 4 }).map((_, i) => ({
									label: `loading-${i}`,
									value: '—',
									highlight: false,
							  }))
							: combatStats
						).map((stat) => (
							<div
								key={stat.label}
								className='flex items-center justify-between'
							>
								<span className='text-sm text-gray-600'>
									{stat.label}
								</span>
								<span
									className={`text-sm font-bold ${
										stat.highlight
											? 'text-blue-600'
											: 'text-gray-900'
									}`}
								>
									{stat.value}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className='bg-white rounded-lg border border-gray-200 p-6'>
					<h3 className='text-lg font-bold text-gray-900 mb-4'>
						기본 스탯
					</h3>
					<div className='space-y-3'>
						{(isLoading
							? Array.from({ length: 6 }).map((_, i) => ({
									label: `loading-${i}`,
									value: '—',
									highlight: false,
							  }))
							: basicStats
						).map((stat) => (
							<div
								key={stat.label}
								className='flex items-center justify-between'
							>
								<span className='text-sm text-gray-600'>
									{stat.label}
								</span>
								<span
									className={`text-sm font-bold ${
										stat.highlight
											? 'text-blue-600'
											: 'text-gray-900'
									}`}
								>
									{stat.value}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='bg-white rounded-lg border border-gray-200 p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-bold text-gray-900'>
						하이퍼스탯
					</h3>
					<div className='flex items-center gap-2'>
						{([1, 2, 3] as const).map((p) => (
							<button
								key={p}
								type='button'
								onClick={() => setPreset(p)}
								className={`px-2 py-1 text-xs font-medium rounded transition ${
									preset === p
										? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
										: 'text-gray-400 hover:bg-gray-100'
								}`}
							>
								프리셋 {p}
							</button>
						))}
					</div>
				</div>

				{isLoading || !hyper ? (
					<div className='grid grid-cols-2 gap-3 animate-pulse'>
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className='h-10 rounded-lg bg-gray-100'
							/>
						))}
					</div>
				) : (
					<>
						<div className='grid grid-cols-2 gap-3'>
							{hyper.details.slice(0, 8).map((h) => (
								<div
									key={`${h.stat_type}-${h.stat_level}`}
									className={`flex items-center justify-between p-3 rounded-lg ${
										h.stat_level > 0
											? 'bg-blue-50'
											: 'bg-gray-50'
									}`}
								>
									<span className='text-sm text-gray-700'>
										{h.stat_type}
									</span>
									<span
										className={`text-sm font-bold ${
											h.stat_level > 0
												? 'text-blue-600'
												: 'text-gray-900'
										}`}
									>
										Lv.{h.stat_level} ({h.stat_increase})
									</span>
								</div>
							))}
						</div>
						<div className='mt-3 text-xs text-gray-500'>
							남은 포인트:{' '}
							<span className='font-semibold'>
								{hyper.remain}
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
