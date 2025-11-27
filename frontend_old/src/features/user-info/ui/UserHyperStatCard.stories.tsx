import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserHyperStatCard } from './UserHyperStatCard';
import { userStore } from '@/store';
import { UserHyperStatInfo } from '@/shared';

const mockHyperStatPreset: UserHyperStatInfo = {
    hyper_stat_preset_1: [
        {
            stat_type: '크리티컬 확률',
            stat_point: 50,
            stat_level: 10,
            stat_increase: '10%',
        },
        {
            stat_type: '보스 몬스터 공격 시 데미지 증가',
            stat_point: 50,
            stat_level: 10,
            stat_increase: '40%',
        },
        {
            stat_type: '방어율 무시',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '45%',
        },
        {
            stat_type: '데미지',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '27%',
        },
        {
            stat_type: 'STR',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '90',
        },
    ],
    hyper_stat_preset_1_remain_point: 10,
    hyper_stat_preset_2: [
        {
            stat_type: 'DEX',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '90',
        },
        {
            stat_type: '크리티컬 데미지',
            stat_point: 45,
            stat_level: 9,
            stat_increase: '27%',
        },
    ],
    hyper_stat_preset_2_remain_point: 5,
    hyper_stat_preset_3: [
        {
            stat_type: '일반 몬스터 공격 시 데미지 증가',
            stat_point: 30,
            stat_level: 6,
            stat_increase: '30%',
        },
        {
            stat_type: '경험치 획득량',
            stat_point: 20,
            stat_level: 4,
            stat_increase: '8%',
        },
    ],
    hyper_stat_preset_3_remain_point: 3,
};

const meta = {
    title: 'Features/UserInfo/UserHyperStatCard',
    component: UserHyperStatCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserHyperStatInfo(mockHyperStatPreset);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserHyperStatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
