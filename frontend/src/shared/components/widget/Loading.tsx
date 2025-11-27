/**
 * 로딩 컴포넌트
 *
 * 데이터를 불러오는 중일 때 표시하는 로딩 UI입니다.
 */

export function Loading() {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-center'>
				<div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
				<p className='mt-4 text-gray-600'>불러오는 중...</p>
			</div>
		</div>
	);
}
