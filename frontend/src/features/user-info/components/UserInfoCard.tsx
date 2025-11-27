/**
 * 유저 기본 정보 카드 컴포넌트
 *
 * 캐릭터의 기본 정보(이름, 레벨, 직업, 길드 등)를 표시하는 카드 컴포넌트입니다.
 * OCID를 받아서 유저 정보를 조회하고 표시합니다.
 */

'use client';

import { Card } from '@/shared/components/widget';
import { useUserInfo } from '../hooks/useUserInfo';

export interface UserInfoCardProps {
	ocid: string | null;
}

export function UserInfoCard({ ocid }: UserInfoCardProps) {
	const { data: userInfo, isLoading, isError } = useUserInfo(ocid);

	if (isLoading) {
		return (
			<Card label='기본정보'>
				<div className='py-4 text-center text-sm text-gray-500'>
					불러오는 중...
				</div>
			</Card>
		);
	}

	if (isError || !userInfo) {
		return (
			<Card label='기본정보'>
				<div className='py-4 text-center text-sm text-red-500'>
					정보를 불러올 수 없습니다.
				</div>
			</Card>
		);
	}

	return (
		<Card label='기본정보'>
			<div className='flex w-full flex-col items-center gap-2'>
				<div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-gray-50'>
					{userInfo.character_image && (
						<img
							src={userInfo.character_image}
							alt={userInfo.character_name}
							className='h-full w-full object-contain'
						/>
					)}
				</div>
				<div className='flex items-baseline justify-center gap-2'>
					<div className='text-xl font-semibold text-gray-900'>
						{userInfo.character_name}
					</div>
					<div className='text-sm font-medium text-gray-400'>
						{userInfo.world_name}
					</div>
				</div>
				<div className='flex items-center justify-center gap-3 text-sm text-gray-600'>
					<span>{userInfo.character_class}</span>
					<span>|</span>
					<span className='font-medium'>Lv.{userInfo.character_level}</span>
					<span>|</span>
					<span className='text-gray-500'>{userInfo.character_guild_name}</span>
				</div>
			</div>
		</Card>
	);
}

