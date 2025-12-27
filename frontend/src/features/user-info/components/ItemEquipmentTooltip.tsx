/**
 * 장비 아이템 툴팁 컴포넌트
 *
 * - 캐릭터 상세 페이지 등에서 "장비 hover 툴팁"을 공통으로 사용하기 위한 컴포넌트입니다.
 * - 전역 UI 툴팁(`ui.tooltip.show({ content })`)에 넘겨서 렌더링하는 용도를 기본으로 합니다.
 */

import type { ItemEquipment, ItemOption } from '../types/item-equipment';

type GradeTheme = {
	label: string;
	letter: string;
	accentText: string;
	accentBg: string;
	accentRing: string;
	divider: string;
};

function getGradeTheme(grade?: string): GradeTheme {
	// 요청 색상 매핑:
	// 레전드리 = 초록, 유니크 = 주황, 에픽 = 보라, 레어 = 하늘색
	const g = (grade ?? '').trim();
	const map: Record<string, GradeTheme> = {
		레전드리: {
			label: '레전드리',
			letter: 'L',
			accentText: 'text-green-300',
			accentBg: 'bg-green-400/15',
			accentRing: 'ring-green-300/35',
			divider: 'from-green-400/50',
		},
		유니크: {
			label: '유니크',
			letter: 'U',
			accentText: 'text-orange-300',
			accentBg: 'bg-orange-400/15',
			accentRing: 'ring-orange-300/35',
			divider: 'from-orange-400/50',
		},
		에픽: {
			label: '에픽',
			letter: 'E',
			accentText: 'text-purple-300',
			accentBg: 'bg-purple-400/15',
			accentRing: 'ring-purple-300/35',
			divider: 'from-purple-400/50',
		},
		레어: {
			label: '레어',
			letter: 'R',
			accentText: 'text-sky-300',
			accentBg: 'bg-sky-400/15',
			accentRing: 'ring-sky-300/35',
			divider: 'from-sky-400/50',
		},
	};

	return (
		map[g] ?? {
			label: g || '등급',
			letter: '?',
			accentText: 'text-white/80',
			accentBg: 'bg-white/10',
			accentRing: 'ring-white/15',
			divider: 'from-white/20',
		}
	);
}

function isMeaningfulValue(value: unknown) {
	if (value === null || value === undefined) return false;
	const s = String(value).trim();
	if (!s) return false;
	// API에서 "0", "0.0", "0.00" 등으로 오는 값은 표시하지 않음
	if (/^0+(\.0+)?$/.test(s)) return false;
	return true;
}

function buildOptionLines(option?: ItemOption) {
	if (!option) return [];

	const entries: Array<{
		label: string;
		value?: string | number;
		suffix?: string;
	}> = [
		{ label: 'STR', value: option.str },
		{ label: 'DEX', value: option.dex },
		{ label: 'INT', value: option.int },
		{ label: 'LUK', value: option.luk },
		{ label: 'HP', value: option.max_hp },
		{ label: 'MP', value: option.max_mp },
		{ label: '공격력', value: option.attack_power },
		{ label: '마력', value: option.magic_power },
		{ label: '방어력', value: option.armor },
		{ label: '이동속도', value: option.speed },
		{ label: '점프력', value: option.jump },
		{ label: '데미지', value: option.damage, suffix: '%' },
		{ label: '보스 데미지', value: option.boss_damage, suffix: '%' },
		{
			label: '방어율 무시',
			value: option.ignore_monster_armor,
			suffix: '%',
		},
		{ label: '올스탯', value: option.all_stat, suffix: '%' },
		{ label: 'HP%', value: option.max_hp_rate, suffix: '%' },
		{ label: 'MP%', value: option.max_mp_rate, suffix: '%' },
	];

	return entries
		.filter((e) => isMeaningfulValue(e.value))
		.map((e) => ({
			label: e.label,
			value: `${e.value}${e.suffix ?? ''}`,
		}));
}

/**
 * 디버그 목적: 툴팁에 표시되는 핵심 정보를 JSON으로 보기 쉽게 만들기 위한 helper
 * (페이지에서 console.log로 쓰는 용도)
 */
export function buildItemTooltipDebugJson(item: ItemEquipment) {
	return {
		item_name: item.item_name,
		item_equipment_part: item.item_equipment_part,
		item_equipment_slot: item.item_equipment_slot,
		starforce: item.starforce ?? null,
		options_total: buildOptionLines(item.item_total_option),
		potential: item.potential_option_grade
			? {
					grade: item.potential_option_grade,
					lines: [
						item.potential_option_1,
						item.potential_option_2,
						item.potential_option_3,
					].filter(Boolean),
			  }
			: null,
		additional_potential: item.additional_potential_option_grade
			? {
					grade: item.additional_potential_option_grade,
					lines: [
						item.additional_potential_option_1,
						item.additional_potential_option_2,
						item.additional_potential_option_3,
					].filter(Boolean),
			  }
			: null,
		soul:
			item.soul_name || item.soul_option
				? {
						name: item.soul_name ?? null,
						option: item.soul_option ?? null,
				  }
				: null,
	};
}

export function ItemEquipmentTooltip({ item }: { item: ItemEquipment }) {
	const potentialTheme = item.potential_option_grade
		? getGradeTheme(item.potential_option_grade)
		: null;
	const additionalTheme = item.additional_potential_option_grade
		? getGradeTheme(item.additional_potential_option_grade)
		: null;

	return (
		<div className='w-[360px] rounded-xl border border-white/20 bg-gray-900/70 p-3 text-white shadow-2xl backdrop-blur-md'>
			<div className='flex items-start gap-3'>
				{item.item_icon ? (
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15'>
						<img
							src={item.item_icon}
							alt={item.item_name}
							className='h-10 w-10'
						/>
					</div>
				) : null}

				<div className='min-w-0 flex-1'>
					<div className='truncate text-sm font-extrabold'>
						{item.item_name}
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
							{item.item_equipment_part}
						</span>
						{item.starforce ? (
							<span className='rounded-full bg-yellow-400/15 px-2 py-0.5 font-extrabold text-yellow-200 ring-1 ring-yellow-200/20'>
								★ {item.starforce}
							</span>
						) : null}
					</div>
				</div>
			</div>

			{/* 옵션(총합) */}
			{buildOptionLines(item.item_total_option).length > 0 ? (
				<div className='mt-3'>
					<div className='mb-1 text-xs font-extrabold text-white/90'>
						옵션(총합)
					</div>
					<div className='grid grid-cols-2 gap-x-3 gap-y-1 text-[12px]'>
						{buildOptionLines(item.item_total_option).map(
							(line) => (
								<div
									key={line.label}
									className='flex items-center justify-between gap-2'
								>
									<span className='text-white/70'>
										{line.label}
									</span>
									<span className='font-bold text-white'>
										{line.value}
									</span>
								</div>
							)
						)}
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
							{[
								item.potential_option_1,
								item.potential_option_2,
								item.potential_option_3,
							]
								.filter(Boolean)
								.map((v, i) => (
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
							{[
								item.additional_potential_option_1,
								item.additional_potential_option_2,
								item.additional_potential_option_3,
							]
								.filter(Boolean)
								.map((v, i) => (
									<li key={i} className='truncate'>
										- {v}
									</li>
								))}
						</ul>
					</div>
				) : null}
			</div>

			{/* 소울 */}
			{item.soul_name || item.soul_option ? (
				<div className='mt-3 rounded-lg bg-white/5 p-2 ring-1 ring-white/10'>
					<div className='text-xs font-extrabold text-white/90'>
						소울
					</div>
					<div className='mt-1 text-[12px] text-white/85'>
						{item.soul_name ? (
							<div className='truncate'>- {item.soul_name}</div>
						) : null}
						{item.soul_option ? (
							<div className='truncate'>- {item.soul_option}</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
