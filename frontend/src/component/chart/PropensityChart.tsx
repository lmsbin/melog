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
import { UserAbility, UserPropensity } from '../../type';

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
        labels: Object.keys(propensity),
        datasets: [
            {
                label: 'Skill Levels',
                data: Object.values(propensity),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
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
                },
                startAngle: 30,
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
            <Radar data={data} options={options} /> {/* Radar 컴포넌트 사용 */}
        </div>
    );
});
