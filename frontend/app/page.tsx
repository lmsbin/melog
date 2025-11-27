/**
 * 홈 페이지 컴포넌트
 *
 * 루트 경로(/)에 해당하는 메인 페이지입니다.
 * Next.js App Router의 파일 기반 라우팅에 따라 app/page.tsx 파일이 루트 경로를 담당합니다.
 * 현재는 기본적인 환영 메시지만 표시하는 간단한 구조로 되어 있습니다.
 */
export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-4'>Welcome</h1>
				<p className='text-gray-600'>
					Next.js + TanStack Query 프로젝트
				</p>
			</div>
		</main>
	);
}
