import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserPropensityCard } from './UserPropensityCard';
import { userStore } from '@/store';
import { UserPropensity } from '@/shared';

const mockUserPropensity: UserPropensity = {
    charisma_level: 100,
    sensibility_level: 80,
    insight_level: 90,
    willingness_level: 70,
    handicraft_level: 60,
    charm_level: 85,
};

const meta = {
    title: 'Features/UserInfo/UserPropensityCard',
    component: UserPropensityCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserPropensity(mockUserPropensity);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserPropensityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
