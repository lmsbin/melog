/**
 * 프리셋 탭(공통 컴포넌트)
 *
 * 프리셋이 1/2/3처럼 여러 개 존재하는 카드에서
 * 동일한 UI/동일한 인터랙션으로 전환할 수 있도록 공통화한 컴포넌트입니다.
 */

import type { FC } from 'react';

export interface PresetTab {
	value: number;
	label: string;
	disabled?: boolean;
}

export interface PresetTabsProps {
	tabs: PresetTab[];
	value: number;
	onChange: (nextValue: number) => void;
	className?: string;
}

export const PresetTabs: FC<PresetTabsProps> = ({
	tabs,
	value,
	onChange,
	className = '',
}) => {
	return (
		<div
			className={`inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1 ${className}`}
		>
			{tabs.map((tab) => {
				const isActive = tab.value === value;
				return (
					<button
						key={tab.value}
						type='button'
						disabled={tab.disabled}
						onClick={() => onChange(tab.value)}
						className={[
							'px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150',
							tab.disabled
								? 'cursor-not-allowed text-gray-400'
								: 'cursor-pointer',
							isActive
								? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
								: 'text-gray-600 hover:text-gray-900 hover:bg-white/60',
						].join(' ')}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
};
