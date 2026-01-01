/**
 * 트렌드 상승 아이콘 (lucide 대체용, SVG 인라인)
 */
export function TrendingUpIcon({
	className = 'w-4 h-4',
}: {
	className?: string;
}) {
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
			<path d='M22 7l-8.5 8.5-5-5L2 17' />
			<path d='M16 7h6v6' />
		</svg>
	);
}


