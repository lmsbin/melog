/**
 * 검색 아이콘 (lucide 대체용, SVG 인라인)
 */
export function SearchIcon({ className = 'w-4 h-4' }: { className?: string }) {
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
			<circle cx='11' cy='11' r='8' />
			<path d='m21 21-4.3-4.3' />
		</svg>
	);
}
