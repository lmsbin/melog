/**
 * 유저 어빌리티 카드 컴포넌트
 *
 * 캐릭터의 어빌리티 정보를 표시하는 카드 컴포넌트입니다.
 * 어빌리티 등급과 각 어빌리티의 상세 정보를 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { UserAbility } from '../types/ability';
import { Card } from '@/shared/components/widget';

export interface UserAbilityCardProps {
	ability: UserAbility | null;
}

export type UserAbilityCardComponent = FC<UserAbilityCardProps> & {
	Skeleton: FC;
};

const UserAbilityCardBase: FC<UserAbilityCardProps> = ({
	ability,
}: UserAbilityCardProps) => {
	return (
		<Card label='어빌리티'>
			<div className='space-y-2'>
				<div className='text-sm font-medium text-gray-900'>
					등급: {ability?.ability_grade ?? '-'}
				</div>
				<div className='space-y-1'>
					{ability?.ability_info.slice(0, 3).map((item, index) => (
						<div key={index} className='text-sm text-gray-600'>
							{item.ability_grade} - {item.ability_value}
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

const UserAbilityCardSkeleton: FC = () => {
	return (
		<Card label='어빌리티'>
			<div className='space-y-2 animate-pulse'>
				<div className='h-4 w-24 rounded bg-gray-100' />
				<div className='space-y-1'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className='h-4 w-40 rounded bg-gray-100'
						/>
					))}
				</div>
			</div>
		</Card>
	);
};

export const UserAbilityCard = UserAbilityCardBase as UserAbilityCardComponent;
UserAbilityCard.Skeleton = UserAbilityCardSkeleton;
