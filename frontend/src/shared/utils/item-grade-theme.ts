/**
 * 아이템/옵션 등급(레전드리/유니크/에픽/레어) → UI 테마(Tailwind class) 변환 유틸
 *
 * - 색상 규칙을 한 곳에서 관리하기 위해 `shared` 레벨로 올렸습니다.
 * - 요구 매핑: 레전드리=연두(초록), 유니크=주황, 에픽=보라, 레어=하늘색
 */

export type ItemGradeTheme = {
	label: string;
	letter: string;
	/** 텍스트 색상 (예: text-green-300) */
	accentText: string;
	/** 배경 색상(살짝 투명) (예: bg-green-400/15) */
	accentBg: string;
	/** ring 색상 (예: ring-green-300/35) */
	accentRing: string;
	/** 구분선 그라데이션 시작색 (예: from-green-400/50) */
	divider: string;
	/** 작은 점/아이콘 등에 쓸 단색 배경 (예: bg-green-400) */
	solidBg: string;
};

export function getItemGradeTheme(grade?: string): ItemGradeTheme {
	const g = (grade ?? '').trim();

	const map: Record<string, ItemGradeTheme> = {
		레전드리: {
			label: '레전드리',
			letter: 'L',
			accentText: 'text-green-300',
			accentBg: 'bg-green-400/15',
			accentRing: 'ring-green-300/35',
			divider: 'from-green-400/50',
			solidBg: 'bg-green-400',
		},
		유니크: {
			label: '유니크',
			letter: 'U',
			accentText: 'text-orange-300',
			accentBg: 'bg-orange-400/15',
			accentRing: 'ring-orange-300/35',
			divider: 'from-orange-400/50',
			solidBg: 'bg-orange-400',
		},
		에픽: {
			label: '에픽',
			letter: 'E',
			accentText: 'text-purple-300',
			accentBg: 'bg-purple-400/15',
			accentRing: 'ring-purple-300/35',
			divider: 'from-purple-400/50',
			solidBg: 'bg-purple-400',
		},
		레어: {
			label: '레어',
			letter: 'R',
			accentText: 'text-sky-300',
			accentBg: 'bg-sky-400/15',
			accentRing: 'ring-sky-300/35',
			divider: 'from-sky-400/50',
			solidBg: 'bg-sky-400',
		},
	};

	return (
		map[g] ?? {
			label: g || '등급',
			letter: '?',
			accentText: 'text-gray-500',
			accentBg: 'bg-gray-200/70',
			accentRing: 'ring-gray-300/60',
			divider: 'from-gray-300/60',
			solidBg: 'bg-gray-300',
		}
	);
}
