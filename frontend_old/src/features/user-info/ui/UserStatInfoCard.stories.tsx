import type { Meta, StoryObj } from '@storybook/react-vite';
import UserStatInfoCardWrapper, { UserStatInfoProps } from './UserStatInfoCard';
import { UserStatInfo } from '@/shared';

const mockUserStatInfo: UserStatInfo = {
    final_stat: [
        { stat_name: 'STR', stat_value: '10000' },
        { stat_name: 'DEX', stat_value: '5000' },
        { stat_name: 'INT', stat_value: '3000' },
        { stat_name: 'LUK', stat_value: '12000' },
        { stat_name: '최대 HP', stat_value: '500000' },
        { stat_name: '최대 MP', stat_value: '200000' },
        { stat_name: '공격력', stat_value: '15000' },
        { stat_name: '마력', stat_value: '8000' },
        { stat_name: '방어력', stat_value: '12000' },
        { stat_name: '이동속도', stat_value: '140' },
        { stat_name: '점프력', stat_value: '123' },
        { stat_name: '보스 공격력', stat_value: '350%' },
        { stat_name: '일반 몬스터 공격력', stat_value: '100%' },
        { stat_name: '크리티컬 확률', stat_value: '100%' },
        { stat_name: '크리티컬 데미지', stat_value: '80%' },
        { stat_name: '방어율 무시', stat_value: '95%' },
        { stat_name: '데미지', stat_value: '50%' },
        { stat_name: '올스탯', stat_value: '15%' },
        { stat_name: '최대 HP 비율', stat_value: '20%' },
        { stat_name: '최대 MP 비율', stat_value: '10%' },
    ],
};

const meta = {
    title: 'Features/UserInfo/UserStatInfoCard',
    component: UserStatInfoCardWrapper,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        userStatInfo: mockUserStatInfo,
    } as UserStatInfoProps,
} satisfies Meta<typeof UserStatInfoCardWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userStatInfo: mockUserStatInfo,
    },
};
