/**
 * 유저 어빌리티 카드 컴포넌트
 *
 * 캐릭터의 어빌리티 정보를 표시하는 카드 컴포넌트입니다.
 * 어빌리티 등급과 각 어빌리티의 상세 정보를 표시합니다.
 */

'use client';

import { Card } from '@/shared/components/widget';
import { useUserAbility } from '../hooks/useUserAbility';

export interface UserAbilityCardProps {
	ocid: string | null;
}

export function UserAbilityCard({ ocid }: UserAbilityCardProps) {
	const { data: ability, isLoading, isError } = useUserAbility(ocid);

	if (isLoading) {
		return (
			<Card label='어빌리티'>
				<div className='py-4 text-center text-sm text-gray-500'>
					불러오는 중...
				</div>
			</Card>
		);
	}

	if (isError || !ability) {
		return (
			<Card label='어빌리티'>
				<div className='py-4 text-center text-sm text-red-500'>
					정보를 불러올 수 없습니다.
				</div>
			</Card>
		);
	}

	return (
		<Card label='어빌리티'>
			<div className='space-y-2'>
				<div className='text-sm font-medium text-gray-900'>
					등급: {ability.ability_grade}
				</div>
				<div className='space-y-1'>
					{ability.ability_info.slice(0, 3).map((item, index) => (
						<div key={index} className='text-sm text-gray-600'>
							{item.ability_grade} - {item.ability_value}
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}

