/**
 * 유저 심볼 카드 컴포넌트
 *
 * 캐릭터의 심볼 장비 정보를 표시하는 카드 컴포넌트입니다.
 * 각 심볼의 레벨과 스탯 정보를 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { UserSymbolEquipment } from '../types/symbol';
import { Card } from '@/shared/components/widget';

export interface UserSymbolCardProps {
	symbolEquipment: UserSymbolEquipment | null;
}

export type UserSymbolCardComponent = FC<UserSymbolCardProps> & {
	Skeleton: FC;
};

const UserSymbolCardBase: FC<UserSymbolCardProps> = ({
	symbolEquipment,
}: UserSymbolCardProps) => {
	return (
		<Card label='심볼'>
			<div className='flex flex-wrap justify-center gap-3'>
				{symbolEquipment?.symbol.map((symbol, index) => (
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
};

const UserSymbolCardSkeleton: FC = () => {
	return (
		<Card label='심볼'>
			<div className='flex flex-wrap justify-center gap-3 animate-pulse'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						key={index}
						className='flex flex-col items-center rounded-lg border border-gray-200 p-3'
					>
						<div className='h-12 w-12 rounded bg-gray-100' />
						<div className='mt-2 space-y-1 text-center'>
							<div className='h-4 w-16 rounded bg-gray-100' />
							<div className='h-3 w-10 rounded bg-gray-100' />
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export const UserSymbolCard = UserSymbolCardBase as UserSymbolCardComponent;
UserSymbolCard.Skeleton = UserSymbolCardSkeleton;
