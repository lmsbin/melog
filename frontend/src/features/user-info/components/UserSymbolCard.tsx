/**
 * 유저 심볼 카드 컴포넌트
 *
 * 캐릭터의 심볼 장비 정보를 표시하는 카드 컴포넌트입니다.
 * 각 심볼의 레벨과 스탯 정보를 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { Symbol } from '../types/symbol';
import { Card } from '@/shared/components/widget';

export interface UserSymbolCardProps {
	symbolRows: Symbol[][];
}

export type UserSymbolCardComponent = FC<UserSymbolCardProps> & {
	Skeleton: FC;
};

function SymbolTile({ symbol }: { symbol: Symbol }) {
	const isMaxLevel = symbol.symbol_level >= 20;
	return (
		<div className='group flex flex-col items-center rounded-xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300'>
			<div className='relative'>
				{symbol.symbol_icon && (
					<img
						src={symbol.symbol_icon}
						alt={symbol.symbol_name}
						className='h-14 w-14 drop-shadow-md transition-transform duration-300 group-hover:scale-110'
					/>
				)}
				{isMaxLevel && (
					<div className='absolute -top-1 -right-1 h-5 w-5 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 flex items-center justify-center'>
						<span className='text-[10px] font-bold text-white'>
							★
						</span>
					</div>
				)}
			</div>
			<div className='mt-3 text-center'>
				<div className='text-xs font-semibold text-gray-800 line-clamp-2 max-w-[80px] break-keep'>
					{symbol.symbol_name}
				</div>
				<div
					className={`mt-1 text-xs font-bold ${
						isMaxLevel ? 'text-orange-500' : 'text-gray-500'
					}`}
				>
					<span className='whitespace-nowrap'>Lv.{symbol.symbol_level}</span>
				</div>
			</div>
		</div>
	);
}

const UserSymbolCardBase: FC<UserSymbolCardProps> = ({
	symbolRows,
}: UserSymbolCardProps) => {
	return (
		<Card label='심볼'>
			{symbolRows.length === 0 ? (
				<div className='text-sm text-gray-500'>
					심볼 정보가 없습니다.
				</div>
			) : (
				<div className='space-y-4'>
					{symbolRows.map((row, rowIndex) => (
						<div
							key={`symbol-row-${rowIndex}`}
							className='grid grid-cols-6 justify-items-center gap-4'
						>
							{row.map((symbol, index) => (
								<SymbolTile
									key={`${symbol.symbol_name}-${index}`}
									symbol={symbol}
								/>
							))}
						</div>
					))}
				</div>
			)}
		</Card>
	);
};

const UserSymbolCardSkeleton: FC = () => {
	return (
		<Card label='심볼'>
			<div className='grid grid-cols-6 justify-items-center gap-3 animate-pulse'>
				{Array.from({ length: 12 }).map((_, index) => (
					<div
						key={`symbol-skeleton-${index}`}
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
