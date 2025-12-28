/**
 * 장비 아이템 툴팁 컴포넌트
 *
 * - 캐릭터 상세 페이지 등에서 "장비 hover 툴팁"을 공통으로 사용하기 위한 컴포넌트입니다.
 * - 전역 UI 툴팁(`ui.tooltip.show({ content })`)에 넘겨서 렌더링하는 용도를 기본으로 합니다.
 */

import type { ItemEquipmentTooltipViewModel } from '../types/item-equipment';
import { getItemGradeTheme } from '@/shared/utils/item-grade-theme';

function clampInt(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function parseStarforce(value: string | null): number | null {
	if (!value) return null;
	const n = Number.parseInt(value, 10);
	return Number.isFinite(n) ? n : null;
}

function StarIcon({ filled }: { filled: boolean }) {
	// SVG: 별(스타) 아이콘. Tailwind의 text 색상을 fill로 사용합니다.
	// - 채운 별은 drop-shadow로 "은은한 번짐(글로우)" 효과를 줍니다.
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 24 24'
			aria-hidden='true'
			className={
				filled
					? 'text-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.55)]'
					: 'text-white/25'
			}
			fill='currentColor'
		>
			<path d='M12 2.6l2.88 6.01 6.63.96-4.8 4.68 1.13 6.61L12 17.82 6.16 20.86l1.13-6.61-4.8-4.68 6.63-.96L12 2.6z' />
		</svg>
	);
}

function StarforceStars({
	starforce,
	maxStars = 30,
	breakAfter = 15,
}: {
	starforce: string | null;
	maxStars?: number;
	breakAfter?: number;
}) {
	const n = parseStarforce(starforce);
	if (n === null) return null;

	const safeMax = Math.max(1, Math.floor(maxStars));
	const filledCount = clampInt(n, 0, safeMax);

	const buildRow = (start: number, end: number) =>
		Array.from({ length: end - start }, (_, idx) => {
			const globalIndex = start + idx;
			const needsGroupGap = idx !== 0 && idx % 5 === 0;
			return (
				<span key={globalIndex} className={needsGroupGap ? 'ml-1' : ''}>
					<StarIcon filled={globalIndex < filledCount} />
				</span>
			);
		});

	const rows =
		breakAfter > 0 && safeMax > breakAfter
			? [buildRow(0, breakAfter), buildRow(breakAfter, safeMax)]
			: [buildRow(0, safeMax)];

	return (
		<div
			className='mb-2 flex flex-col items-center gap-0.5'
			aria-label={`스타포스 ${filledCount}/${safeMax}`}
			role='img'
		>
			{rows.map((row, idx) => (
				<div key={idx} className='flex items-center gap-0.5'>
					{row}
				</div>
			))}
		</div>
	);
}

export function ItemEquipmentTooltip({
	vm,
}: {
	vm: ItemEquipmentTooltipViewModel;
}) {
	const potentialTheme = vm.potentialOptionGrade
		? getItemGradeTheme(vm.potentialOptionGrade)
		: null;
	const additionalTheme = vm.additionalPotentialOptionGrade
		? getItemGradeTheme(vm.additionalPotentialOptionGrade)
		: null;

	return (
		<div className='w-[360px] rounded-xl border border-white/20 bg-gray-900/70 p-3 text-white shadow-2xl backdrop-blur-md'>
			<StarforceStars starforce={vm.starforce} />

			<div className='flex items-start gap-3'>
				{vm.itemIcon ? (
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15'>
						<img
							src={vm.itemIcon}
							alt={vm.itemName}
							className='h-10 w-10'
						/>
					</div>
				) : null}

				<div className='min-w-0 flex-1'>
					<div className='truncate text-sm font-extrabold'>
						{vm.itemName}
					</div>
					<div className='mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/80'>
						{potentialTheme ? (
							<span
								className={`rounded-full px-2 py-0.5 font-extrabold ring-1 ${potentialTheme.accentBg} ${potentialTheme.accentText} ${potentialTheme.accentRing}`}
							>
								{potentialTheme.label} 아이템
							</span>
						) : null}
						<span className='rounded-full bg-white/10 px-2 py-0.5 ring-1 ring-white/10'>
							{vm.itemEquipmentPart}
						</span>
					</div>
				</div>
			</div>

			{/* 옵션 */}
			{vm.optionLines.length > 0 ? (
				<div className='mt-3'>
					<div className='mb-1 text-xs font-extrabold text-white/90'>
						옵션
					</div>
					<div className='space-y-0.5 text-[12px]'>
						{vm.optionLines.map((line) => (
							<div key={line.label} className='flex gap-2'>
								<span className='shrink-0 text-white/70'>
									{line.label} :
								</span>
								<span className='font-bold text-white'>
									{line.totalText}
								</span>
								{line.breakdownText ? (
									<span className='text-white/70'>
										{line.breakdownText}
									</span>
								) : null}
							</div>
						))}
					</div>
				</div>
			) : null}

			{/* 잠재/에디셔널 */}
			<div className='mt-3 grid grid-cols-1 gap-2'>
				{potentialTheme ? (
					<div className='rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
						<div className='flex items-center gap-2'>
							<span
								className={`flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-black ring-1 ${potentialTheme.accentBg} ${potentialTheme.accentText} ${potentialTheme.accentRing}`}
							>
								{potentialTheme.letter}
							</span>
							<div
								className={`text-xs font-extrabold ${potentialTheme.accentText}`}
							>
								잠재옵션 ({potentialTheme.label})
							</div>
							<div
								className={`h-px flex-1 bg-linear-to-r ${potentialTheme.divider} to-transparent`}
							/>
						</div>
						<ul className='mt-1 space-y-0.5 text-[12px] text-white/85'>
							{vm.potentialLines.map((v, i) => (
								<li key={i} className='truncate'>
									- {v}
								</li>
							))}
						</ul>
					</div>
				) : null}

				{additionalTheme ? (
					<div className='rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
						<div className='flex items-center gap-2'>
							<span
								className={`flex h-5 w-5 items-center justify-center rounded-md text-[11px] font-black ring-1 ${additionalTheme.accentBg} ${additionalTheme.accentText} ${additionalTheme.accentRing}`}
							>
								{additionalTheme.letter}
							</span>
							<div
								className={`text-xs font-extrabold ${additionalTheme.accentText}`}
							>
								에디셔널 잠재옵션 ({additionalTheme.label})
							</div>
							<div
								className={`h-px flex-1 bg-linear-to-r ${additionalTheme.divider} to-transparent`}
							/>
						</div>
						<ul className='mt-1 space-y-0.5 text-[12px] text-white/85'>
							{vm.additionalPotentialLines.map((v, i) => (
								<li key={i} className='truncate'>
									- {v}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>

			{/* 소울 */}
			{vm.soulName || vm.soulOption ? (
				<div className='mt-3 rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
					<div className='text-xs font-extrabold text-white/90'>
						소울
					</div>
					<div className='mt-1 text-[12px] text-white/85'>
						{vm.soulName ? (
							<div className='truncate'>- {vm.soulName}</div>
						) : null}
						{vm.soulOption ? (
							<div className='truncate'>- {vm.soulOption}</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
