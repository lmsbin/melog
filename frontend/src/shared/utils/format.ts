enum FormatOption {
	// 천자리 구분단위
	THOUSAND_SEPARATOR = 'THOUSAND_SEPARATOR',
	// 퍼센트
	PERCENT = 'PERCENT',
}

function getFormatOption(property: string) {
	switch (property) {
		// 스탯/수치형 (천 단위 구분)
		case 'STR':
		case 'DEX':
		case 'INT':
		case 'LUK':
		case 'HP':
		case 'MP':
		case '최대 HP':
		case '최대 MP':
		case '공격력':
		case '마력':
		case '방어력':
		case '이동속도':
		case '점프력':
		case '최소 스탯공격력':
		case '최대 스탯공격력':
			return FormatOption.THOUSAND_SEPARATOR;
		case '크리티컬 확률':
		case '크리티컬 데미지':
		case '데미지':
		case '보스 몬스터 공격 시 데미지':
		case '최종 데미지':
		case '몬스터 방어율 무시':
		case '올스탯':
		case 'HP%':
		case 'MP%':
		// case '상태이상 내성':
		case '스탠스':
			return FormatOption.PERCENT;
	}
}

export function format(property: string, value: string) {
	const option = getFormatOption(property);
	if (!option) return value;

	switch (option) {
		case FormatOption.THOUSAND_SEPARATOR:
			return formatThousandSeparator(value);
		case FormatOption.PERCENT:
			return formatPercent(value);
	}

	// 안전장치: option이 늘어났는데 switch가 누락된 경우
	return value;
}

function formatThousandSeparator(value: string) {
	const trimmed = value?.trim?.() ?? '';
	if (!trimmed) return trimmed;

	// 기존 콤마를 제거한 뒤 숫자만 남는 경우에만 천단위 구분을 적용합니다.
	const normalized = trimmed.replace(/,/g, '');
	if (!/^-?\d+(\.\d+)?$/.test(normalized)) return trimmed;

	const n = Number(normalized);
	if (!Number.isFinite(n)) return trimmed;

	// 소수점이 있는 경우는 그대로 두고, 정수만 ko-KR 포맷(콤마)을 적용합니다.
	if (!Number.isInteger(n)) return trimmed;
	return new Intl.NumberFormat('ko-KR', { maximumFractionDigits: 0 }).format(
		n
	);
}

function formatPercent(value: string) {
	const trimmed = value?.trim?.() ?? '';
	if (!trimmed) return trimmed;
	if (/%\s*$/.test(trimmed)) return trimmed;
	return `${trimmed}%`;
}
