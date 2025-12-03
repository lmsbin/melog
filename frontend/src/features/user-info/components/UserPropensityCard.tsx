/**
 * 유저 성향 카드 컴포넌트
 *
 * 캐릭터의 성향 정보를 표시하는 카드 컴포넌트입니다.
 * 카리스마, 감성, 통찰력, 의지, 손재주, 매력 레벨을 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { UserPropensity } from '../types/propensity';
import { Card } from '@/shared/components/widget';

export interface UserPropensityCardProps {
	propensity: UserPropensity | null;
}

export type UserPropensityCardComponent = FC<UserPropensityCardProps> & {
	Skeleton: FC;
};

const UserPropensityCardBase: FC<UserPropensityCardProps> = ({
	propensity,
}: UserPropensityCardProps) => {
	const propensityList = [
		{ label: '카리스마', value: propensity?.charisma_level ?? 0 },
		{ label: '감성', value: propensity?.sensibility_level ?? 0 },
		{ label: '통찰력', value: propensity?.insight_level ?? 0 },
		{ label: '의지', value: propensity?.willingness_level ?? 0 },
		{ label: '손재주', value: propensity?.handicraft_level ?? 0 },
		{ label: '매력', value: propensity?.charm_level ?? 0 },
	];

	return (
		<Card label='성향'>
			<div className='grid grid-cols-2 gap-3'>
				{propensityList.map((item) => (
					<div key={item.label} className='flex justify-between'>
						<span className='text-sm text-gray-600'>
							{item.label}
						</span>
						<span className='text-sm font-medium text-gray-900'>
							{item.value}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
};

const UserPropensityCardSkeleton: FC = () => {
	return (
		<Card label='성향'>
			<div className='grid grid-cols-2 gap-3 animate-pulse'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className='flex justify-between'>
						<div className='h-4 w-16 rounded bg-gray-100' />
						<div className='h-4 w-8 rounded bg-gray-100' />
					</div>
				))}
			</div>
		</Card>
	);
};

export const UserPropensityCard =
	UserPropensityCardBase as UserPropensityCardComponent;
UserPropensityCard.Skeleton = UserPropensityCardSkeleton;
