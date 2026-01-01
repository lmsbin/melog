/**
 * 장비 탭 패널
 * - 장비 아이템 hover 시 전역 툴팁(ui.tooltip) + ItemEquipmentTooltip 재사용
 */

'use client';

import { useMemo } from 'react';
import { ItemEquipmentTooltip } from '@/features/user-info/components';
import { gradeToClasses } from '@/features/user-info/character-detail/utils/grade';
import { parseNumber } from '@/features/user-info/character-detail/utils/format';
import { ui } from '@/shared/ui-controller';
import type { ItemEquipmentWithTooltip } from '@/features/user-info/character-detail/types';

export function EquipmentPanel({
	isLoading,
	itemEquipmentWithTooltip,
}: {
	isLoading: boolean;
	itemEquipmentWithTooltip: ItemEquipmentWithTooltip;
}) {
	const summary = useMemo(() => {
		const items = itemEquipmentWithTooltip.map((x) => x.item);
		const counts = { legendary: 0, unique: 0, epic: 0, rare: 0 };
		let starSum = 0;
		let starCount = 0;

		for (const it of items) {
			const g = (it.potential_option_grade ?? '').trim();
			if (g.includes('레전드')) counts.legendary += 1;
			else if (g.includes('유니크')) counts.unique += 1;
			else if (g.includes('에픽')) counts.epic += 1;
			else if (g.includes('레어')) counts.rare += 1;

			const s = parseNumber(it.starforce);
			if (s !== null) {
				starSum += s;
				starCount += 1;
			}
		}
		const avgStar = starCount > 0 ? starSum / starCount : null;
		return {
			counts,
			avgStar: avgStar !== null ? Math.round(avgStar) : null,
		};
	}, [itemEquipmentWithTooltip]);

	return (
		<div className='bg-white rounded-lg border border-gray-200 p-6'>
			<h3 className='text-lg font-bold text-gray-900 mb-4'>착용 장비</h3>

			{isLoading ? (
				<div className='grid grid-cols-2 gap-4 animate-pulse'>
					{Array.from({ length: 10 }).map((_, i) => (
						<div key={i} className='h-16 rounded-lg bg-gray-100' />
					))}
				</div>
			) : (
				<div className='grid grid-cols-2 gap-4'>
					{itemEquipmentWithTooltip.map(({ item, tooltip }) => (
						<div
							key={`${item.item_equipment_slot}-${item.item_name}`}
							className={`flex items-center gap-3 p-3 rounded-lg border-2 transition hover:shadow-md cursor-pointer ${gradeToClasses(
								item.potential_option_grade
							)}`}
							onMouseEnter={(e) => {
								ui.tooltip.show({
									x: e.clientX,
									y: e.clientY,
									content: (
										<ItemEquipmentTooltip vm={tooltip} />
									),
								});
							}}
							onMouseMove={(e) =>
								ui.tooltip.move(e.clientX, e.clientY)
							}
							onMouseLeave={() => ui.tooltip.hide()}
						>
							<div className='w-12 h-12 bg-white rounded border border-gray-200 flex items-center justify-center shrink-0'>
								{item.item_icon ? (
									<img
										src={item.item_icon}
										alt={item.item_name}
										className='w-10 h-10'
									/>
								) : (
									<div className='w-10 h-10 bg-gray-100 rounded' />
								)}
							</div>
							<div className='flex-1 min-w-0'>
								<div className='text-xs text-gray-500 mb-0.5'>
									{item.item_equipment_part}
								</div>
								<div className='text-sm font-medium text-gray-900 truncate'>
									{item.item_name}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<div className='mt-6 pt-6 border-t border-gray-200'>
				<div className='grid grid-cols-3 gap-4 text-center'>
					<div>
						<div className='text-2xl font-bold text-yellow-600'>
							{summary.counts.legendary}
						</div>
						<div className='text-xs text-gray-500 mt-1'>
							레전드리
						</div>
					</div>
					<div>
						<div className='text-2xl font-bold text-amber-600'>
							{summary.counts.unique}
						</div>
						<div className='text-xs text-gray-500 mt-1'>유니크</div>
					</div>
					<div>
						<div className='text-2xl font-bold text-blue-600'>
							{summary.avgStar === null
								? '—'
								: `${summary.avgStar}★`}
						</div>
						<div className='text-xs text-gray-500 mt-1'>
							평균 스타포스
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
