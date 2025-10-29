// 컴포넌트 variant 스타일 정의
// 모든 컴포넌트의 스타일을 중앙에서 관리하여 일관성 유지

// ========== Card Variants ==========
export const cardVariants = {
    // 기본 카드 스타일
    base: {
        container:
            'flex min-w-fit flex-wrap rounded-xl border bg-white p-4 shadow-sm transition-all duration-normal',
        hover: 'hover:border-gray-200 hover:shadow-md',
        label: 'mb-1 flex w-full !items-start !justify-start self-start',
        labelText: 'text-base font-semibold text-gray-800',
    },
    // 사이즈 variants
    size: {
        default: 'gap-2',
        sm: 'gap-1 p-2',
        lg: 'gap-4 p-6',
    },
    // 색상 variants
    color: {
        default: 'border-gray-100 bg-white',
        gray: 'border-gray-200 bg-gray-50',
        primary: 'border-primary-200 bg-primary-50',
    },
} as const;

// ========== Button Variants ==========
export const buttonVariants = {
    // 기본 버튼 스타일
    base: {
        default: 'cursor-pointer font-medium transition-colors duration-fast',
        disabled: 'cursor-not-allowed opacity-50',
    },
    // 사이즈 variants
    size: {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-base rounded-lg',
        lg: 'px-6 py-3 text-lg rounded-xl',
    },
    // 색상 variants
    color: {
        primary: 'bg-primary-800 text-white hover:bg-primary-700',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-50',
        nav: {
            default: 'px-4 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            active: 'px-4 py-1 rounded-md font-semibold text-gray-900 bg-gray-50',
        },
    },
} as const;

// ========== Badge/Ability Grade Variants ==========
export const badgeVariants = {
    // 어빌리티 등급별 색상
    ability: {
        legendary: 'bg-purple-50 text-purple-700 border-purple-200',
        unique: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        epic: 'bg-blue-50 text-blue-700 border-blue-200',
        rare: 'bg-gray-50 text-gray-700 border-gray-200',
    },
    // 기본 뱃지 스타일
    base: 'rounded-lg border px-2.5 py-1 text-sm font-semibold',
} as const;

// ========== Helper 함수 ==========
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

/**
 * Variant를 조합하여 최종 클래스명을 생성
 */
export function variantClass(base: string, ...variants: (string | undefined)[]): string {
    return cn(base, ...variants);
}
