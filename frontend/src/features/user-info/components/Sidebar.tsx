/**
 * 캐릭터 상세 화면 우측 사이드바
 */

'use client';

import type { UserAbility } from '@/features/user-info/types/ability';
import type { UserInfo } from '@/features/user-info/types/user';
import { abilityGradeToClasses } from '@/features';
import {
	AwardIcon,
	TrendingUpIcon,
	UsersIcon,
} from '@/shared/components/icons';

export function Sidebar({
	isLoading,
	userInfo,
	userAbility,
}: {
	isLoading: boolean;
	userInfo: UserInfo | null;
	userAbility: UserAbility | null;
}) {
	const abilityGrade = userAbility?.ability_grade ?? null;
	const lines = userAbility?.ability_info ?? [];

	return (
		<div className='w-80 shrink-0 space-y-4'>
			<div className='bg-white rounded-lg border border-gray-200 p-5'>
				<h3 className='text-sm font-bold text-gray-900 mb-3'>
					어빌리티
				</h3>

				<div className='flex items-center gap-2 mb-3'>
					<span className='text-xs text-gray-500'>등급:</span>
					<span className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded'>
						{isLoading ? '—' : abilityGrade || '—'}
					</span>
				</div>

				{isLoading ? (
					<div className='space-y-2 animate-pulse'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className='h-16 rounded bg-gray-100' />
						))}
					</div>
				) : (
					<div className='space-y-2'>
						{lines.slice(0, 3).map((a) => {
							const cls = abilityGradeToClasses(a.ability_grade);
							return (
								<div
									key={`${a.ability_no}-${a.ability_grade}`}
									className={`p-2.5 rounded border ${cls}`}
								>
									<div className='flex items-center gap-1.5 mb-1'>
										<div className='w-1.5 h-1.5 rounded-full bg-current' />
										<span className='text-xs font-semibold'>
											{a.ability_grade}
										</span>
									</div>
									<div className='text-sm text-gray-900'>
										{a.ability_value}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<div className='bg-white rounded-lg border border-gray-200 p-5'>
				<div className='flex items-center gap-2 mb-4'>
					<div className='text-blue-600'>
						<TrendingUpIcon />
					</div>
					<h3 className='text-sm font-bold text-gray-900'>
						서버 랭킹
					</h3>
				</div>
				<div className='text-sm text-gray-500'>
					랭킹 데이터는 아직 연결되지 않았어요. (준비중)
				</div>
			</div>

			<div className='bg-white rounded-lg border border-gray-200 p-5'>
				<div className='flex items-center gap-2 mb-4'>
					<div className='text-blue-600'>
						<AwardIcon />
					</div>
					<h3 className='text-sm font-bold text-gray-900'>업적</h3>
				</div>
				<div className='text-sm text-gray-500'>
					업적 데이터는 아직 연결되지 않았어요. (준비중)
				</div>
			</div>

			<div className='bg-white rounded-lg border border-gray-200 p-5'>
				<div className='flex items-center gap-2 mb-4'>
					<div className='text-blue-600'>
						<UsersIcon />
					</div>
					<h3 className='text-sm font-bold text-gray-900'>길드</h3>
				</div>

				<div className='text-center py-3'>
					<div className='text-lg font-bold text-gray-900 mb-1'>
						{isLoading
							? '—'
							: userInfo?.character_guild_name || '없음'}
					</div>
					<div className='text-sm text-gray-500'>
						길드 상세 데이터는 준비중
					</div>
				</div>
			</div>
		</div>
	);
}
