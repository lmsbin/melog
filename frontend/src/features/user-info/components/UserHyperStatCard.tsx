/**
 * 유저 하이퍼스탯 카드 컴포넌트
 *
 * - 프리셋(1/2/3) 전환 UI를 포함합니다.
 * - 현재 내려오는 데이터(UserHyperStatInfo)에 포함된 프리셋만 사용합니다.
 */

'use client';

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { UserHyperStatInfo } from '../types/hyper-stat';
import { Card } from '@/shared/components/widget';
import { PresetTabs } from '@/shared/components/ui';

export interface UserHyperStatCardProps {
	hyperStatInfo: UserHyperStatInfo | null;
}

export type UserHyperStatCardComponent = FC<UserHyperStatCardProps> & {
	Skeleton: FC;
};

function getPresetView(
	data: UserHyperStatInfo,
	presetNo: 1 | 2 | 3
): { remainPoint: number; stats: UserHyperStatInfo['hyper_stat_preset_1'] } {
	if (presetNo === 1) {
		return {
			remainPoint: data.hyper_stat_preset_1_remain_point,
			stats: data.hyper_stat_preset_1,
		};
	}
	if (presetNo === 2) {
		return {
			remainPoint: data.hyper_stat_preset_2_remain_point,
			stats: data.hyper_stat_preset_2,
		};
	}
	return {
		remainPoint: data.hyper_stat_preset_3_remain_point,
		stats: data.hyper_stat_preset_3,
	};
}

const UserHyperStatCardBase: FC<UserHyperStatCardProps> = ({
	hyperStatInfo,
}) => {
	const [preset, setPreset] = useState<1 | 2 | 3>(1);

	const presetView = useMemo(() => {
		if (!hyperStatInfo) return null;
		return getPresetView(hyperStatInfo, preset);
	}, [hyperStatInfo, preset]);

	return (
		<Card label='하이퍼스탯'>
			{!presetView ? (
				<UserHyperStatCard.Skeleton />
			) : (
				<div className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div className='text-sm font-semibold text-gray-700'>
							프리셋 {preset}{' '}
							<span className='text-gray-500 font-medium'>
								(남은 포인트: {presetView.remainPoint})
							</span>
						</div>
						<PresetTabs
							value={preset}
							onChange={(next) => setPreset(next as 1 | 2 | 3)}
							tabs={[
								{ value: 1, label: '1' },
								{ value: 2, label: '2' },
								{ value: 3, label: '3' },
							]}
						/>
					</div>

					<div className='space-y-2'>
						{presetView.stats.slice(0, 5).map((stat, index) => (
							<div
								key={index}
								className='flex items-center justify-between rounded-lg bg-linear-to-r from-blue-50 to-purple-50 p-3 text-sm transition-all duration-200 hover:shadow-sm'
							>
								<span className='font-medium text-gray-700'>
									{stat.stat_type}
								</span>
								<span className='font-bold text-blue-600'>
									Lv.{stat.stat_level} (+{stat.stat_increase})
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</Card>
	);
};

const UserHyperStatCardSkeleton: FC = () => {
	return (
		<Card label='하이퍼스탯'>
			<div className='space-y-4 animate-pulse'>
				<div>
					<div className='mb-2 h-4 w-64 rounded bg-gray-100' />
					<div className='space-y-1'>
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className='flex justify-between text-sm'
							>
								<div className='h-4 w-24 rounded bg-gray-100' />
								<div className='h-4 w-32 rounded bg-gray-100' />
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};

export const UserHyperStatCard =
	UserHyperStatCardBase as UserHyperStatCardComponent;
UserHyperStatCard.Skeleton = UserHyperStatCardSkeleton;
