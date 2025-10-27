import { Radar } from 'react-chartjs-2'; // Radar 컴포넌트 임포트
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    plugins,
} from 'chart.js'; // 필요한 기본 요소들만 임포트
import { memo } from 'react';
import { UserAbility, UserPropensity } from '../../../shared';
import { propensityMapper } from '../../../util';

// Chart.js 모듈 등록 (v3 이상에서는 필수 요소만 등록)
ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
);

export interface PropensityChartProps {
    propensity: UserPropensity;
}

export const PropensityChart = memo(function PropensityChart({ propensity }: PropensityChartProps) {
    const data = {
        labels: Object.keys(propensity).map((x) => propensityMapper[x as keyof UserPropensity]),
        datasets: [
            {
                label: '성향',
                data: Object.values(propensity),
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
                borderColor: 'rgba(71, 85, 105, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                pointBorderColor: 'rgba(71, 85, 105, 1)',
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 25,
                    display: false,
                },
                grid: {
                    color: 'rgba(148, 163, 184, 0.2)',
                },
                startAngle: 30,
                pointLabels: {
                    font: {
                        size: 12,
                    },
                    color: '#64748b',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="h-60 w-80">
            <Radar data={data} options={options} />
        </div>
    );
});
