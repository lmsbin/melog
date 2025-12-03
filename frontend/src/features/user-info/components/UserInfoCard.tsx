/**
 * 유저 기본 정보 카드 컴포넌트
 *
 * 캐릭터의 기본 정보(이름, 레벨, 직업, 길드 등)를 표시하는 카드 컴포넌트입니다.
 * OCID를 받아서 유저 정보를 조회하고 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { UserInfo } from '../types/user';
import { Card } from '@/shared/components/widget';

export interface UserInfoCardProps {
	userInfo: UserInfo | null;
}

export type UserInfoCardComponent = FC<UserInfoCardProps> & {
	
	Skeleton: FC;
};

const UserInfoCardBase: FC<UserInfoCardProps> = ({ userInfo }) => {
	return (
		<Card label='기본정보'>
			<div className='flex w-full flex-col items-center gap-2'>
				<div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-gray-50'>
					{userInfo?.character_image && (
						<img
							src={userInfo.character_image}
							alt={userInfo.character_name}
							className='h-full w-full object-contain'
						/>
					)}
				</div>
				<div className='flex items-baseline justify-center gap-2'>
					<div className='text-xl font-semibold text-gray-900'>
						{userInfo?.character_name ?? '캐릭터 이름'}
					</div>
					<div className='text-sm font-medium text-gray-400'>
						{userInfo?.world_name ?? '월드'}
					</div>
				</div>
				<div className='flex items-center justify-center gap-3 text-sm text-gray-600'>
					<span>{userInfo?.character_class ?? '직업'}</span>
					<span>|</span>
					<span className='font-medium'>
						Lv.{userInfo?.character_level ?? '--'}
					</span>
					<span>|</span>
					<span className='text-gray-500'>
						{userInfo?.character_guild_name ?? '길드'}
					</span>
				</div>
			</div>
		</Card>
	);
};

const UserInfoCardSkeleton: FC = () => {
	return (
		<Card label='기본정보'>
			<div className='flex w-full flex-col items-center gap-2 animate-pulse'>
				<div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-gray-100' />
				<div className='flex items-baseline justify-center gap-2'>
					<div className='h-6 w-24 rounded bg-gray-100' />
					<div className='h-4 w-12 rounded bg-gray-100' />
				</div>
				<div className='flex items-center justify-center gap-3 text-sm'>
					<div className='h-4 w-16 rounded bg-gray-100' />
					<div className='h-4 w-10 rounded bg-gray-100' />
					<div className='h-4 w-20 rounded bg-gray-100' />
				</div>
			</div>
		</Card>
	);
};

export const UserInfoCard = UserInfoCardBase as UserInfoCardComponent;
UserInfoCard.Skeleton = UserInfoCardSkeleton;
