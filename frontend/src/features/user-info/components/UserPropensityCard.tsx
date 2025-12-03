/**
 * 유저 성향 카드 컴포넌트
 *
 * 캐릭터의 성향 정보를 표시하는 카드 컴포넌트입니다.
 * 카리스마, 감성, 통찰력, 의지, 손재주, 매력 레벨을 레이더 차트로 표시합니다.
 */

'use client';

import type { FC } from 'react';
import type { UserPropensity } from '../types/propensity';
import { Card } from '@/shared/components/widget';
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Chart.js 컴포넌트 등록
ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export interface UserPropensityCardProps {
	propensity: UserPropensity | null;
}

export type UserPropensityCardComponent = FC<UserPropensityCardProps> & {
	Skeleton: FC;
};

const UserPropensityCardBase: FC<UserPropensityCardProps> = ({
	propensity,
}: UserPropensityCardProps) => {
	const labels = ['카리스마', '감성', '통찰력', '의지', '손재주', '매력'];
	const values = [
		propensity?.charisma_level ?? 0,
		propensity?.sensibility_level ?? 0,
		propensity?.insight_level ?? 0,
		propensity?.willingness_level ?? 0,
		propensity?.handicraft_level ?? 0,
		propensity?.charm_level ?? 0,
	];

	const chartData = {
		labels,
		datasets: [
			{
				label: '성향',
				data: values,
				backgroundColor: 'rgba(99, 102, 241, 0.2)',
				borderColor: 'rgba(99, 102, 241, 1)',
				borderWidth: 2,
				pointBackgroundColor: 'rgba(99, 102, 241, 1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 1,
		layout: {
			padding: 0,
		},
		scales: {
			r: {
				beginAtZero: true,
				max: 100,
				ticks: {
					stepSize: 20,
					display: true,
					font: {
						size: 11,
					},
					color: '#6b7280',
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.1)',
					lineWidth: 1,
				},
				pointLabels: {
					font: {
						size: 13,
						weight: 'bold' as const,
					},
					color: '#374151',
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				callbacks: {
					label: function (context: any) {
						return `${context.label}: ${context.parsed.r}`;
					},
				},
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				padding: 12,
				titleFont: {
					size: 14,
					weight: 'bold' as const,
				},
				bodyFont: {
					size: 13,
				},
			},
		},
	};

	return (
		<Card label='성향'>
			<div className='flex w-full items-center justify-center py-4'>
				<div className='flex w-full max-w-xs items-center justify-center'>
					<div className='w-full'>
						<Radar data={chartData} options={chartOptions} />
					</div>
				</div>
			</div>
		</Card>
	);
};

const UserPropensityCardSkeleton: FC = () => {
	return (
		<Card label='성향'>
			<div className='flex items-center justify-center py-4'>
				<div className='h-64 w-64 rounded-full bg-gray-100 animate-pulse' />
			</div>
		</Card>
	);
};

export const UserPropensityCard =
	UserPropensityCardBase as UserPropensityCardComponent;
UserPropensityCard.Skeleton = UserPropensityCardSkeleton;
