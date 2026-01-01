/**
 * 아직 연결되지 않은 탭용 기본 패널
 *
 * - character-detail 내 탭 패널 영역에서만 쓰이므로 `panels/` 하위로 둡니다.
 */

export function PlaceholderPanel({ label }: { label: string }) {
	return (
		<div className='bg-white rounded-lg border border-gray-200 p-6'>
			<h3 className='text-lg font-bold text-gray-900 mb-2'>{label}</h3>
			<div className='text-sm text-gray-500'>이 탭은 아직 준비중입니다.</div>
		</div>
	);
}


