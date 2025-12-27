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
	// 기본은 항상 포함(0이어도), 나머지는 0이 아니면 포함
	const rest = [add, etc, starforce, exceptional].filter((v) => v !== 0);
	return { base, rest };
}

function buildTotalOptionLinesWithBreakdown(
	item: ItemEquipment
): ItemEquipmentTooltipViewModel['optionLines'] {
	return TOTAL_OPTION_FIELDS.map((f) => {
		const totalRaw = item.item_total_option?.[f.key];
		const total = parseNumber(totalRaw);
		if (total === null) return null;
		if (!isMeaningfulValue(total)) return null;

		const { base, rest } = buildOptionBreakdown(item, f.key);
		const totalText = formatTotal(total, f.suffix);

		const breakdownText =
			rest.length > 0
				? `(${[
						`${formatNumber(base)}${f.suffix ?? ''}`,
						...rest.map((v) => formatSignedCompact(v, f.suffix)),
				  ].join(' ')})`
				: null;

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
