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
import { getItemGradeTheme } from '@/shared/utils/item-grade-theme';

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
			<div className='space-y-4'>
				{ability?.ability_grade && (
					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-gray-600'>
							등급:
						</span>
						{(() => {
							const theme = getItemGradeTheme(
								ability.ability_grade
							);
							return (
								<span
									className={`rounded-full px-3 py-1 text-xs font-extrabold ring-1 ${theme.accentBg} ${theme.accentText} ${theme.accentRing}`}
								>
									{ability.ability_grade}
								</span>
							);
						})()}
					</div>
				)}
				<div className='space-y-2.5'>
					{ability?.ability_info.slice(0, 3).map((item, index) =>
						(() => {
							const theme = getItemGradeTheme(item.ability_grade);
							return (
								<div
									key={index}
									className='rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-200 hover:shadow-md'
								>
									<div className='mb-1 flex items-center gap-2'>
										<div
											className={`h-2 w-2 rounded-full ${theme.solidBg}`}
										/>
										<span
											className={`text-xs font-semibold ${theme.accentText}`}
										>
											{item.ability_grade}
										</span>
									</div>
									<div className='text-sm font-medium text-gray-800'>
										{item.ability_value}
									</div>
								</div>
							);
						})()
					)}
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
