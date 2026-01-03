/**
 * 캐릭터 프로필 카드(상단 큰 카드)
 */

'use client';

import type { UserInfo } from '@/features/user-info/types/user';
import type { UserStatInfo } from '@/features/user-info/types/stat';
import { pickStatValue } from '@/features';

export function CharacterProfileCard({
	isLoading,
	userInfo,
	userStatInfo,
}: {
	isLoading: boolean;
	userInfo: UserInfo | null;
	userStatInfo: UserStatInfo | null;
}) {
	const name = userInfo?.character_name ?? '';
	const world = userInfo?.world_name ?? '';
	const klass = userInfo?.character_class ?? '';
	const guild = userInfo?.character_guild_name ?? '';
	const level = userInfo?.character_level ?? null;
	const image = userInfo?.character_image ?? '';

	// "전투력/인기도" 같은 값은 현재 API 응답 타입에 없어서,
	// 여기서는 대표적으로 사용자가 바로 체감하는 지표(최대 스탯공격력, 경험치%)를 대신 노출합니다.
	const maxAtk = pickStatValue(userStatInfo, '최대 스탯공격력');
	const expRate = userInfo?.character_exp_rate ?? null;

	return (
		<div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
			<div className='h-32 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 relative'>
				<div className='absolute inset-0 bg-black/20' />
			</div>

			<div className='relative px-6 pb-6'>
				<div className='absolute -top-20 left-6'>
					<div className='w-40 h-40 bg-white rounded-lg border-4 border-white shadow-lg overflow-hidden'>
						{isLoading ? (
							<div className='w-full h-full bg-gray-100 animate-pulse' />
						) : (
							<img
								src={image}
								alt={name}
								className='w-full h-full object-cover object-center scale-210'
							/>
						)}
					</div>
				</div>

				<div className='pt-24 flex items-start justify-between gap-4'>
					<div className='min-w-0'>
						<div className='flex items-center gap-3 mb-2 flex-wrap'>
							<h1 className='text-2xl font-bold text-gray-900'>
								{isLoading ? (
									<span className='inline-block h-7 w-40 bg-gray-100 rounded animate-pulse' />
								) : (
									name || '—'
								)}
							</h1>
							<span className='px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded'>
								{isLoading ? '—' : world || '—'}
							</span>
						</div>

						<div className='flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap'>
							<span className='font-medium'>
								{isLoading ? '—' : klass || '—'}
							</span>
							<span className='text-gray-300'>•</span>
							<span>
								길드: {isLoading ? '—' : guild || '없음'}
							</span>
						</div>

						<div className='flex items-center gap-6 flex-wrap'>
							<div>
								<div className='text-xs text-gray-500 mb-0.5'>
									레벨
								</div>
								<div className='text-lg font-bold text-gray-900'>
									{isLoading || level === null
										? '—'
										: `Lv.${level}`}
								</div>
							</div>
							<div className='w-px h-10 bg-gray-200' />
							<div>
								<div className='text-xs text-gray-500 mb-0.5'>
									최대 스탯공격력
								</div>
								<div className='text-lg font-bold text-blue-600'>
									{isLoading || !maxAtk ? '—' : maxAtk}
								</div>
							</div>
							<div className='w-px h-10 bg-gray-200' />
							<div>
								<div className='text-xs text-gray-500 mb-0.5'>
									경험치
								</div>
								<div className='text-lg font-bold text-gray-900'>
									{isLoading || !expRate
										? '—'
										: String(expRate)}
								</div>
							</div>
						</div>
					</div>

					<div className='flex gap-2 shrink-0'>
						<button
							className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition'
							type='button'
						>
							즐겨찾기
						</button>
						<button
							className='px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition'
							type='button'
						>
							공유
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
