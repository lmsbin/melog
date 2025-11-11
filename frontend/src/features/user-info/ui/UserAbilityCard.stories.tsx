import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserAbilityCard } from './UserAbilityCard';
import { userStore } from '@/store';
import { UserAbility } from '@/shared';

const mockUserAbility: UserAbility = {
    date: new Date('2024-01-01'),
    ability_grade: '레전드리',
    ability_info: [
        {
            ability_no: '1',
            ability_grade: '레전드리',
            ability_value: '보스 몬스터 공격 시 데미지 20% 증가',
        },
        {
            ability_no: '2',
            ability_grade: '유니크',
            ability_value: '크리티컬 확률 8% 증가',
        },
        {
            ability_no: '3',
            ability_grade: '에픽',
            ability_value: '공격력 9 증가',
        },
    ],
};

const meta = {
    title: 'Features/UserInfo/UserAbilityCard',
    component: UserAbilityCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserAbility(mockUserAbility);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserAbilityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
