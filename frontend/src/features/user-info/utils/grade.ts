/**
 * 장비/어빌리티 등급에 따른 스타일 클래스 매핑
 * - 디자인 정책이 바뀌면 여기만 수정하면 되도록 분리
 */

export function gradeToClasses(grade: string | null | undefined) {
	const g = (grade ?? '').trim();
	if (g.includes('레전드')) return 'border-yellow-500 bg-yellow-50';
	if (g.includes('유니크')) return 'border-amber-500 bg-amber-50';
	if (g.includes('에픽')) return 'border-purple-500 bg-purple-50';
	if (g.includes('레어')) return 'border-blue-500 bg-blue-50';
	return 'border-gray-200 bg-gray-50';
}

export function abilityGradeToClasses(grade: string | null | undefined) {
	const g = (grade ?? '').trim();
	if (g.includes('레전드'))
		return 'bg-green-50 border-green-200 text-green-700';
	if (g.includes('유니크'))
		return 'bg-orange-50 border-orange-200 text-orange-700';
	if (g.includes('에픽'))
		return 'bg-purple-50 border-purple-200 text-purple-700';
	if (g.includes('레어')) return 'bg-blue-50 border-blue-200 text-blue-700';
	return 'bg-gray-50 border-gray-200 text-gray-700';
}
