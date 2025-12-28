/**
 * 캐릭터 상세 페이지 ViewModel
 *
 * - 닉네임을 기반으로 OCID를 조회합니다.
 * - 조회한 OCID를 사용해 여러 유저 정보 API를 병렬로 호출합니다.
 * - View에서는 이 ViewModel이 제공하는 데이터와 로딩 상태를 활용해
 *   캐릭터 상세 화면을 렌더링할 수 있습니다.
 *
 * 주의:
 * - 검색 기록 관리, 라우팅 이동 등 유저 액션/사이드이펙트 관련 로직은
 *   현재 단계에서는 포함하지 않고, 데이터 fetch 중심으로 구성합니다.
 */

import { useMemo } from 'react';
import { useOcid } from '@/features/search/hooks/useOcid';
import {
	useUserAbility,
	useUserDojang,
	useUserHexaMatrix,
	useUserHyperStatInfo,
	useUserInfo,
	useUserItemEquipment,
	useUserPropensity,
	useUserSetEffect,
	useUserStatInfo,
	useUserSymbolEquipment,
	useUserVMatrix,
} from '@/features/user-info/hooks';
import type { Symbol } from '@/features/user-info/types/symbol';
import type {
	ItemEquipment,
	ItemEquipmentTooltipViewModel,
	ItemOption,
} from '@/features/user-info/types/item-equipment';

type UseCharacterPageViewModelParams = {
	nickName: string;
};

type OptionFieldKey = keyof ItemOption;

const TOTAL_OPTION_FIELDS: Array<{
	label: string;
	key: OptionFieldKey;
	suffix?: string;
}> = [
	{ label: 'STR', key: 'str' },
	{ label: 'DEX', key: 'dex' },
	{ label: 'INT', key: 'int' },
	{ label: 'LUK', key: 'luk' },
	{ label: '최대 HP', key: 'max_hp' },
	{ label: '최대 MP', key: 'max_mp' },
	{ label: '공격력', key: 'attack_power' },
	{ label: '마력', key: 'magic_power' },
	{ label: '방어력', key: 'armor' },
	{ label: '이동속도', key: 'speed' },
	{ label: '점프력', key: 'jump' },
	{ label: '데미지', key: 'damage', suffix: '%' },
	{ label: '보스 몬스터 공격 시 데미지', key: 'boss_damage', suffix: '%' },
	{ label: '몬스터 방어율 무시', key: 'ignore_monster_armor', suffix: '%' },
	{ label: '올스탯', key: 'all_stat', suffix: '%' },
	{ label: 'HP%', key: 'max_hp_rate', suffix: '%' },
	{ label: 'MP%', key: 'max_mp_rate', suffix: '%' },
];

function isMeaningfulValue(value: unknown) {
	if (value === null || value === undefined) return false;
	const s = String(value).trim();
	if (!s) return false;
	if (/^0+(\.0+)?$/.test(s)) return false;
	return true;
}

function parseNumber(value: unknown): number | null {
	if (value === null || value === undefined) return null;
	const s = String(value).trim();
	if (!s) return null;
	const normalized = s.replace(/[%+,]/g, '');
	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}

function formatNumber(n: number) {
	return Number.isInteger(n) ? String(n) : String(n);
}

function formatTotal(n: number, suffix?: string) {
	// 합산 결과는 +를 붙이지 않음 (음수는 - 유지)
	const absCore = `${formatNumber(Math.abs(n))}${suffix ?? ''}`;
	return n < 0 ? `-${absCore}` : `${formatNumber(n)}${suffix ?? ''}`;
}

function formatSignedCompact(n: number, suffix?: string) {
	const core = `${formatNumber(n)}${suffix ?? ''}`;
	return n >= 0 ? `+${core}` : core;
}

function buildOptionBreakdown(item: ItemEquipment, key: OptionFieldKey) {
	const base = parseNumber(item.item_base_option?.[key]) ?? 0;
	const add = parseNumber(item.item_add_option?.[key]) ?? 0;
	const etc = parseNumber(item.item_etc_option?.[key]) ?? 0;
	const starforce = parseNumber(item.item_starforce_option?.[key]) ?? 0;
	const exceptional = parseNumber(item.item_exceptional_option?.[key]) ?? 0;
	// breakdown 표기 요구사항:
	// (기본 + 주문서 + 스타포스 + 추가옵션) 순서로 표기
	// exceptional(익셉셔널 강화)은 표기 요구에 없어서 제외
	return { base, etc, starforce, add, exceptional };
}

function buildTotalOptionLinesWithBreakdown(
	item: ItemEquipment
): ItemEquipmentTooltipViewModel['optionLines'] {
	return TOTAL_OPTION_FIELDS.map((f) => {
		const totalRaw = item.item_total_option?.[f.key];
		const total = parseNumber(totalRaw);
		if (total === null) return null;
		if (!isMeaningfulValue(total)) return null;

		const { base, etc, starforce, add } = buildOptionBreakdown(item, f.key);
		const totalText = formatTotal(total, f.suffix);

		// 괄호 안은 "(기본 + 주문서 + 스타포스 + 추가옵션)" 순서
		// - 맨 앞(기본)은 +를 붙이지 않음
		// - 나머지는 0이 아니면 포함(+/- 포함)
		const first = `${formatTotal(base, f.suffix)}`;
		const rest = [starforce, etc, add]
			.filter((v) => v !== 0)
			.map((v) => formatSignedCompact(v, f.suffix));
		const breakdownText = `(${[first, ...rest].join(' ')})`;

		return { label: f.label, totalText, breakdownText };
	}).filter(Boolean) as ItemEquipmentTooltipViewModel['optionLines'];
}

function buildItemEquipmentTooltipViewModel(
	item: ItemEquipment
): ItemEquipmentTooltipViewModel {
	return {
		itemName: item.item_name,
		itemIcon: item.item_icon || null,
		itemEquipmentPart: item.item_equipment_part,
		starforce: item.starforce || null,
		potentialOptionGrade: item.potential_option_grade || null,
		additionalPotentialOptionGrade:
			item.additional_potential_option_grade || null,
		optionLines: buildTotalOptionLinesWithBreakdown(item),
		potentialLines: [
			item.potential_option_1,
			item.potential_option_2,
			item.potential_option_3,
		].filter(Boolean) as string[],
		additionalPotentialLines: [
			item.additional_potential_option_1,
			item.additional_potential_option_2,
			item.additional_potential_option_3,
		].filter(Boolean) as string[],
		soulName: item.soul_name || null,
		soulOption: item.soul_option || null,
	};
}

function chunkArray<T>(items: T[], chunkSize: number): T[][] {
	if (chunkSize <= 0) return [items];
	const result: T[][] = [];
	for (let i = 0; i < items.length; i += chunkSize) {
		result.push(items.slice(i, i + chunkSize));
	}
	return result;
}

/**
 * 심볼이 "아케인/어센틱" 중 어디에 속하는지 문자열 기반으로 판별합니다.
 *
 * - API 타입에 명시적인 구분 필드가 없어서 symbol_name / symbol_force / symbol_description을 파싱합니다.
 * - 새로운 심볼이 추가되더라도 "어센틱" 키워드 또는 지역명 기반으로 최대한 안전하게 분류합니다.
 */
function getSymbolCategory(symbol: Symbol): 'arcane' | 'authentic' {
	const haystack = `${symbol.symbol_name ?? ''} ${
		symbol.symbol_force ?? ''
	} ${symbol.symbol_description ?? ''}`;

	// 1) 키워드가 직접 들어오는 케이스(가장 우선)
	if (/어센틱|authentic/i.test(haystack)) return 'authentic';

	// 2) 어센틱 지역명 기반(키워드가 없을 때)
	const authenticRegions = [
		'세르니움',
		'아르크스',
		'오디움',
		'도원경',
		'아르테리아',
		'카르시온',
	];
	if (authenticRegions.some((r) => haystack.includes(r))) return 'authentic';

	// 3) 기본값은 아케인
	return 'arcane';
}

export function useCharacterPageViewModel({
	nickName,
}: UseCharacterPageViewModelParams) {
	// OCID 조회
	const {
		data: ocidData,
		isLoading: ocidLoading,
		isError: ocidError,
		error: ocidErrorDetail,
	} = useOcid(nickName);

	const ocid = ocidData?.ocid ?? null;

	// 유저 정보 조회
	const userInfoQuery = useUserInfo(ocid);
	const userStatInfoQuery = useUserStatInfo(ocid);
	const userHyperStatInfoQuery = useUserHyperStatInfo(ocid);
	const userPropensityQuery = useUserPropensity(ocid);
	const userAbilityQuery = useUserAbility(ocid);
	const userSymbolEquipmentQuery = useUserSymbolEquipment(ocid);
	const userSetEffectQuery = useUserSetEffect(ocid);
	const userVMatrixQuery = useUserVMatrix(ocid);
	const userHexaMatrixQuery = useUserHexaMatrix(ocid);
	const userDojangQuery = useUserDojang(ocid);
	const userItemEquipmentQuery = useUserItemEquipment(ocid);

	// 장비 툴팁용 ViewModel (페칭 완료 후 1회 생성)
	const itemEquipmentWithTooltip = useMemo(() => {
		const items = userItemEquipmentQuery.data?.item_equipment ?? [];
		return items.map((item) => ({
			item,
			tooltip: buildItemEquipmentTooltipViewModel(item),
		}));
	}, [userItemEquipmentQuery.data]);

	/**
	 * 심볼 ViewModel
	 *
	 * 1) 데이터 fetch 후(=query.data 기준) 문자열 파싱으로 아케인/어센틱 분리
	 * 2) 각 그룹을 6개 단위로 2차원 배열(로우)로 변환
	 * 3) 그룹별 로우를 합쳐 단일 2차원 배열(symbolRows)로 제공
	 * 4) View에서는 로우 단위로 순회하며 한 줄에 6개씩 고정 렌더링
	 */
	const symbolRows = useMemo(() => {
		const symbols = userSymbolEquipmentQuery.data?.symbol ?? [];
		const arcane: Symbol[] = [];
		const authentic: Symbol[] = [];

		for (const s of symbols) {
			const category = getSymbolCategory(s);
			if (category === 'authentic') authentic.push(s);
			else arcane.push(s);
		}

		// 아케인 6개 로우들 + 어센틱 6개 로우들을 "하나의 2차원 배열"로 합칩니다.
		// (요구사항: row 이름으로 구분하지 않고, 카드에서는 row만 순회)
		return [...chunkArray(arcane, 6), ...chunkArray(authentic, 6)];
	}, [userSymbolEquipmentQuery.data]);

	// 페이지 단위 로딩 상태 집계
	const isLoading =
		ocidLoading ||
		userInfoQuery.isLoading ||
		userStatInfoQuery.isLoading ||
		userHyperStatInfoQuery.isLoading ||
		userPropensityQuery.isLoading ||
		userAbilityQuery.isLoading ||
		userSymbolEquipmentQuery.isLoading ||
		userSetEffectQuery.isLoading ||
		userVMatrixQuery.isLoading ||
		userHexaMatrixQuery.isLoading ||
		userDojangQuery.isLoading ||
		userItemEquipmentQuery.isLoading;

	/**
	 * 페이지 단위 "fetch 진행 중" 상태 집계
	 *
	 * - isLoading: 최초 로딩(데이터가 아직 없을 때)에 집중
	 * - isFetching: 캐시가 있더라도 재조회/백그라운드 fetch를 포함
	 *
	 * 전체 로딩바 같은 UI는 사용자가 "지금 뭔가 불러오는 중"임을
	 * 확실히 인지할 수 있게 isFetching을 기준으로 보여주는 편이 유리합니다.
	 */
	const isFetching =
		ocidLoading ||
		userInfoQuery.isFetching ||
		userStatInfoQuery.isFetching ||
		userHyperStatInfoQuery.isFetching ||
		userPropensityQuery.isFetching ||
		userAbilityQuery.isFetching ||
		userSymbolEquipmentQuery.isFetching ||
		userSetEffectQuery.isFetching ||
		userVMatrixQuery.isFetching ||
		userHexaMatrixQuery.isFetching ||
		userDojangQuery.isFetching ||
		userItemEquipmentQuery.isFetching;

	return {
		nickName,
		ocid,
		ocidError,
		ocidErrorDetail,
		isLoading,
		isFetching,
		models: {
			itemEquipmentWithTooltip,
			symbolRows,
		},
		queries: {
			userInfo: userInfoQuery,
			userStatInfo: userStatInfoQuery,
			userHyperStatInfo: userHyperStatInfoQuery,
			userPropensity: userPropensityQuery,
			userAbility: userAbilityQuery,
			userSymbolEquipment: userSymbolEquipmentQuery,
			userSetEffect: userSetEffectQuery,
			userVMatrix: userVMatrixQuery,
			userHexaMatrix: userHexaMatrixQuery,
			userDojang: userDojangQuery,
			userItemEquipment: userItemEquipmentQuery,
		},
	};
}
