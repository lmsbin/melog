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
			<div className='flex w-full flex-col items-center gap-3'>
				<div className='relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-2 shadow-inner ring-2 ring-white/50'>
					{userInfo?.character_image && (
						<img
							src={userInfo.character_image}
							alt={userInfo.character_name}
							className='h-full w-full scale-200 object-contain drop-shadow-lg'
						/>
					)}
				</div>
				<div className='flex flex-col items-center gap-2'>
					<div className='flex items-baseline justify-center gap-2'>
						<div className='text-2xl font-bold text-gray-900'>
							{userInfo?.character_name ?? '캐릭터 이름'}
						</div>
						<div className='rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-semibold text-gray-700'>
							{userInfo?.world_name ?? '월드'}
						</div>
					</div>
					<div className='flex items-center justify-center gap-3 text-sm'>
						<span className='font-medium text-gray-700'>
							{userInfo?.character_class ?? '직업'}
						</span>
						<span className='text-gray-300'>•</span>
						<span className='font-bold text-blue-600'>
							Lv.{userInfo?.character_level ?? '--'}
						</span>
						{userInfo?.character_guild_name && (
							<>
								<span className='text-gray-300'>•</span>
								<span className='text-gray-500'>
									{userInfo.character_guild_name}
								</span>
							</>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

const UserInfoCardSkeleton: FC = () => {
	return (
		<Card label='기본정보'>
			<div className='flex w-full flex-col items-center gap-3 animate-pulse'>
				<div className='flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl bg-gray-100' />
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
