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

const getGradeColor = (grade: string) => {
	const gradeMap: Record<string, string> = {
		레전드리: 'from-yellow-400 to-orange-500',
		유니크: 'from-purple-400 to-pink-500',
		에픽: 'from-blue-400 to-indigo-500',
		레어: 'from-green-400 to-teal-500',
	};
	return gradeMap[grade] || 'from-gray-300 to-gray-400';
};

const getGradeBadgeColor = (grade: string) => {
	const gradeMap: Record<string, string> = {
		레전드리: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
		유니크: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white',
		에픽: 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white',
		레어: 'bg-gradient-to-r from-green-400 to-teal-500 text-white',
	};
	return gradeMap[grade] || 'bg-gray-200 text-gray-700';
};

const UserAbilityCardBase: FC<UserAbilityCardProps> = ({
	ability,
}: UserAbilityCardProps) => {
	return (
		<Card label='어빌리티'>
			<div className='space-y-4'>
				{ability?.ability_grade && (
					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-gray-600'>
							등급:
						</span>
						<span
							className={`rounded-full px-3 py-1 text-xs font-bold ${getGradeBadgeColor(
								ability.ability_grade
							)}`}
						>
							{ability.ability_grade}
						</span>
					</div>
				)}
				<div className='space-y-2.5'>
					{ability?.ability_info.slice(0, 3).map((item, index) => (
						<div
							key={index}
							className='rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-200 hover:shadow-md'
						>
							<div className='flex items-center gap-2 mb-1'>
								<div
									className={`h-2 w-2 rounded-full bg-gradient-to-r ${getGradeColor(
										item.ability_grade
									)}`}
								/>
								<span className='text-xs font-semibold text-gray-500'>
									{item.ability_grade}
								</span>
							</div>
							<div className='text-sm font-medium text-gray-800'>
								{item.ability_value}
							</div>
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
