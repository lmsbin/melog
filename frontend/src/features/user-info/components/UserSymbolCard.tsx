/**
 * 유저 심볼 카드 컴포넌트
 *
 * 캐릭터의 심볼 장비 정보를 표시하는 카드 컴포넌트입니다.
 * 각 심볼의 레벨과 스탯 정보를 표시합니다.
 */

'use client';

import { Card } from '@/shared/components/widget';
import { useUserSymbolEquipment } from '../hooks/useUserSymbolEquipment';

export interface UserSymbolCardProps {
	ocid: string | null;
}

export function UserSymbolCard({ ocid }: UserSymbolCardProps) {
	const { data: symbolEquipment, isLoading, isError } =
		useUserSymbolEquipment(ocid);

	if (isLoading) {
		return (
			<Card label='심볼'>
				<div className='py-4 text-center text-sm text-gray-500'>
					불러오는 중...
				</div>
			</Card>
		);
	}

	if (isError || !symbolEquipment) {
		return (
			<Card label='심볼'>
				<div className='py-4 text-center text-sm text-red-500'>
					정보를 불러올 수 없습니다.
				</div>
			</Card>
		);
	}

	return (
		<Card label='심볼'>
			<div className='flex flex-wrap justify-center gap-3'>
				{symbolEquipment.symbol.map((symbol, index) => (
					<div
						key={index}
						className='flex flex-col items-center rounded-lg border border-gray-200 p-3'
					>
						{symbol.symbol_icon && (
							<img
								src={symbol.symbol_icon}
								alt={symbol.symbol_name}
								className='h-12 w-12'
							/>
						)}
						<div className='mt-2 text-center'>
							<div className='text-sm font-medium text-gray-900'>
								{symbol.symbol_name}
							</div>
							<div className='text-xs text-gray-500'>
								Lv.{symbol.symbol_level}
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}

