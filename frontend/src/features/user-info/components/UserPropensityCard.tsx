/**
 * 유저 성향 카드 컴포넌트
 *
 * 캐릭터의 성향 정보를 표시하는 카드 컴포넌트입니다.
 * 카리스마, 감성, 통찰력, 의지, 손재주, 매력 레벨을 표시합니다.
 */

'use client';

import { Card } from '@/shared/components/widget';
import { useUserPropensity } from '../hooks/useUserPropensity';

export interface UserPropensityCardProps {
	ocid: string | null;
}

export function UserPropensityCard({ ocid }: UserPropensityCardProps) {
	const { data: propensity, isLoading, isError } = useUserPropensity(ocid);

	if (isLoading) {
		return (
			<Card label='성향'>
				<div className='py-4 text-center text-sm text-gray-500'>
					불러오는 중...
				</div>
			</Card>
		);
	}

	if (isError || !propensity) {
		return (
			<Card label='성향'>
				<div className='py-4 text-center text-sm text-red-500'>
					정보를 불러올 수 없습니다.
				</div>
			</Card>
		);
	}

	const propensityList = [
		{ label: '카리스마', value: propensity.charisma_level },
		{ label: '감성', value: propensity.sensibility_level },
		{ label: '통찰력', value: propensity.insight_level },
		{ label: '의지', value: propensity.willingness_level },
		{ label: '손재주', value: propensity.handicraft_level },
		{ label: '매력', value: propensity.charm_level },
	];

	return (
		<Card label='성향'>
			<div className='grid grid-cols-2 gap-3'>
				{propensityList.map((item) => (
					<div key={item.label} className='flex justify-between'>
						<span className='text-sm text-gray-600'>{item.label}</span>
						<span className='text-sm font-medium text-gray-900'>
							{item.value}
						</span>
					</div>
				))}
			</div>
		</Card>
	);
}

