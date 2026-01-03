/**
 * 캐릭터 상세 화면에서 사용하는 포맷/파싱 유틸
 * - user-info 기능(캐릭터 정보 표시) 내부의 character-detail 하위 모듈로 둡니다.
 */

import type { UserStatInfo } from '@/features/user-info/types/stat';

/**
 * 스탯 표시용 포맷터
 *
 * - 최소/최대 스탯공격력: 천 단위 구분(콤마)
 * - 그 외: 값 뒤에 % 붙이기(이미 %가 있으면 유지)
 */
export function formatStatValue(statName: string, statValue: string) {
	const name = statName?.trim() ?? '';
	const value = statValue?.trim() ?? '';

	if (name === '최소 스탯공격력' || name === '최대 스탯공격력') {
		const numeric = Number(value.replace(/,/g, ''));
		if (!Number.isFinite(numeric)) return value;
		return new Intl.NumberFormat('ko-KR', {
			maximumFractionDigits: 0,
		}).format(numeric);
	}

	if (!value) return value;
	if (/%\s*$/.test(value)) return value;
	return `${value}%`;
}

export function pickStatValue(stats: UserStatInfo | null, statName: string) {
	if (!stats?.final_stat) return null;
	const found = stats.final_stat.find((s) => s.stat_name === statName);
	return found?.stat_value ?? null;
}

export function parseNumber(value: unknown): number | null {
	if (value === null || value === undefined) return null;
	const s = String(value).trim();
	if (!s) return null;
	const normalized = s.replace(/[,%+]/g, '').replace(/,/g, '');
	const n = Number(normalized);
	return Number.isFinite(n) ? n : null;
}
