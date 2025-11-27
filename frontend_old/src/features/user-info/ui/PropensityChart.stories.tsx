import type { Meta, StoryObj } from '@storybook/react-vite';
import { PropensityChart, PropensityChartProps } from './PropensityChart';
import { UserPropensity } from '@/shared';

const mockPropensity: UserPropensity = {
    charisma_level: 100,
    sensibility_level: 80,
    insight_level: 90,
    willingness_level: 70,
    handicraft_level: 60,
    charm_level: 85,
};

const meta = {
    title: 'Features/UserInfo/PropensityChart',
    component: PropensityChart,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        propensity: mockPropensity,
    } as PropensityChartProps,
} satisfies Meta<typeof PropensityChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        propensity: mockPropensity,
    },
};
