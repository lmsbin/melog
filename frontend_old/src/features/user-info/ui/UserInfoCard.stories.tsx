import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserInfoCard } from './UserInfoCard';
import { userStore } from '@/store';
import { UserInfo } from '@/shared';

const mockUserInfo: UserInfo = {
    character_name: '테스트캐릭터',
    world_name: '스카니아',
    character_level: 250,
    character_gender: '남',
    character_class: '나이트로드',
    character_class_level: '6차',
    character_exp: 1234567890,
    character_exp_rate: '45.67%',
    character_guild_name: '테스트길드',
    character_image:
        'https://avatar.maplestory.nexon.com/Character/ABCDEFGHIJKLMNOPQRSTUVWXYZ123456.png',
    character_date_create: '2024-01-01',
};

const meta = {
    title: 'Features/UserInfo/UserInfoCard',
    component: UserInfoCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserInfo(mockUserInfo);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
