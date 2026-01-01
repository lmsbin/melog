/**
 * 심볼 탭 패널
 * - 심볼은 view-model 결과(userSymbolEquipment) 기반
 * - 아케인/어센틱 분류는 문자열 파싱(getSymbolCategory)로 처리
 */

'use client';

import { useMemo } from 'react';
import type {
	Symbol,
	UserSymbolEquipment,
} from '@/features/user-info/types/symbol';
import { getSymbolCategory } from '@/features/user-info/character-detail/utils/symbol';
import { parseNumber } from '@/features/user-info/character-detail/utils/format';

export function SymbolPanel({
	isLoading,
	userSymbolEquipment,
}: {
	isLoading: boolean;
	userSymbolEquipment: UserSymbolEquipment | null;
}) {
	const { arcane, authentic } = useMemo(() => {
		const symbols = userSymbolEquipment?.symbol ?? [];
		const a: Symbol[] = [];
		const b: Symbol[] = [];
		for (const s of symbols) {
			if (getSymbolCategory(s) === 'authentic') b.push(s);
			else a.push(s);
		}
		return { arcane: a, authentic: b };
	}, [userSymbolEquipment]);

	const arcaneTotalLevel = useMemo(
		() => arcane.reduce((acc, s) => acc + (s.symbol_level ?? 0), 0),
		[arcane]
	);
	const authenticTotalLevel = useMemo(
		() => authentic.reduce((acc, s) => acc + (s.symbol_level ?? 0), 0),
		[authentic]
	);

	const arcaneForce = useMemo(
		() =>
			arcane.reduce(
				(acc, s) => acc + (parseNumber(s.symbol_force) ?? 0),
				0
			),
		[arcane]
	);
	const authenticForce = useMemo(
		() =>
			authentic.reduce(
				(acc, s) => acc + (parseNumber(s.symbol_force) ?? 0),
				0
			),
		[authentic]
	);

	return (
		<div className='space-y-4'>
			<div className='bg-white rounded-lg border border-gray-200 p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-bold text-gray-900'>
						아케인심볼
					</h3>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-500'>총 레벨:</span>
						<span className='text-lg font-bold text-blue-600'>
							{isLoading ? '—' : arcaneTotalLevel}
						</span>
						{!isLoading && arcaneTotalLevel >= 120 && (
							<span className='text-xs text-gray-400'>(MAX)</span>
						)}
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-3 gap-4 animate-pulse'>
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className='h-32 bg-gray-100 rounded-lg'
							/>
						))}
					</div>
				) : (
					<div className='grid grid-cols-3 gap-4'>
						{arcane.map((symbol) => (
							<div
								key={symbol.symbol_name}
								className='relative flex flex-col items-center p-4 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition group'
							>
								{symbol.symbol_level >= 20 && (
									<div className='absolute top-2 right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center'>
										<span className='text-white text-xs font-bold'>
											★
										</span>
									</div>
								)}

								<div className='w-16 h-16 mb-2'>
									<img
										src={symbol.symbol_icon}
										alt={symbol.symbol_name}
										className='w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition'
									/>
								</div>
								<div className='text-center'>
									<div className='text-xs text-gray-600 mb-1 line-clamp-2 h-8'>
										{symbol.symbol_name}
									</div>
									<div className='text-sm font-bold text-blue-600'>
										Lv.{symbol.symbol_level}
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className='mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200'>
					<div className='flex items-center justify-between'>
						<span className='text-sm font-medium text-gray-700'>
							아케인포스
						</span>
						<span className='text-lg font-bold text-blue-600'>
							{isLoading
								? '—'
								: new Intl.NumberFormat('ko-KR').format(
										arcaneForce
								  )}
						</span>
					</div>
				</div>
			</div>

			<div className='bg-white rounded-lg border border-gray-200 p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-bold text-gray-900'>
						어센틱심볼
					</h3>
					<div className='flex items-center gap-2'>
						<span className='text-sm text-gray-500'>총 레벨:</span>
						<span className='text-lg font-bold text-purple-600'>
							{isLoading ? '—' : authenticTotalLevel}
						</span>
					</div>
				</div>

				{isLoading ? (
					<div className='grid grid-cols-3 gap-4 animate-pulse'>
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className='h-32 bg-gray-100 rounded-lg'
							/>
						))}
					</div>
				) : (
					<div className='grid grid-cols-3 gap-4'>
						{authentic.map((symbol) => (
							<div
								key={symbol.symbol_name}
								className='flex flex-col items-center p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition group'
							>
								<div className='w-16 h-16 mb-2'>
									<img
										src={symbol.symbol_icon}
										alt={symbol.symbol_name}
										className='w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition'
									/>
								</div>
								<div className='text-center'>
									<div className='text-xs text-gray-600 mb-1 line-clamp-2 h-8'>
										{symbol.symbol_name}
									</div>
									<div className='text-sm font-bold text-purple-600'>
										Lv.{symbol.symbol_level}
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className='mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200'>
					<div className='flex items-center justify-between'>
						<span className='text-sm font-medium text-gray-700'>
							어센틱포스
						</span>
						<span className='text-lg font-bold text-purple-600'>
							{isLoading
								? '—'
								: new Intl.NumberFormat('ko-KR').format(
										authenticForce
								  )}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
