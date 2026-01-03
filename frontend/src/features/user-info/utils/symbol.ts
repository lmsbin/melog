/**
 * 심볼(아케인/어센틱) 분류 유틸
 *
 * - API 응답에 명시적인 구분 필드가 없어서 문자열 파싱으로 분류합니다.
 */

import type { Symbol } from '@/features/user-info/types/symbol';

export function getSymbolCategory(symbol: Symbol): 'arcane' | 'authentic' {
	const haystack = `${symbol.symbol_name ?? ''} ${
		symbol.symbol_force ?? ''
	} ${symbol.symbol_description ?? ''}`;

	if (/어센틱|authentic/i.test(haystack)) return 'authentic';

	const authenticRegions = [
		'세르니움',
		'아르크스',
		'오디움',
		'도원경',
		'아르테리아',
		'카르시온',
	];
	if (authenticRegions.some((r) => haystack.includes(r))) return 'authentic';

	return 'arcane';
}
