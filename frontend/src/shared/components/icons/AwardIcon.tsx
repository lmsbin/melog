/**
 * 업적 아이콘 (lucide 대체용, SVG 인라인)
 */
export function AwardIcon({ className = 'w-4 h-4' }: { className?: string }) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
			aria-hidden='true'
		>
			<circle cx='12' cy='8' r='6' />
			<path d='M15.5 13.5 17 22l-5-3-5 3 1.5-8.5' />
		</svg>
	);
}
