import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserSymbolCard } from './UserSymbolCard';
import { userStore } from '@/store';
import { UserSymbolEquipment } from '@/shared';

const mockUserSymbolEquipment: UserSymbolEquipment = {
    symbol: [
        {
            symbol_name: '심볼: 아케인심볼',
            symbol_icon: 'https://avatar.maplestory.nexon.com/ItemIcon/KGPDHCIB.png',
            symbol_description: '아케인 리버 지역의 심볼',
            symbol_force: '1320',
            symbol_level: 20,
            symbol_str: '100',
            symbol_dex: '100',
            symbol_int: '100',
            symbol_luk: '100',
            symbol_hp: '5000',
            symbol_drop_rate: '0%',
            symbol_meso_rate: '0%',
            symbol_exp_rate: '0%',
            symbol_growth_count: 0,
            symbol_require_growth_count: 0,
        },
        {
            symbol_name: '심볼: 어센틱심볼',
            symbol_icon: 'https://avatar.maplestory.nexon.com/ItemIcon/KGPDHCIB.png',
            symbol_description: '어센틱 심볼 지역의 심볼',
            symbol_force: '660',
            symbol_level: 10,
            symbol_str: '50',
            symbol_dex: '50',
            symbol_int: '50',
            symbol_luk: '50',
            symbol_hp: '2500',
            symbol_drop_rate: '0%',
            symbol_meso_rate: '0%',
            symbol_exp_rate: '0%',
            symbol_growth_count: 0,
            symbol_require_growth_count: 0,
        },
        {
            symbol_name: '심볼: 그랜드리스심볼',
            symbol_icon: 'https://avatar.maplestory.nexon.com/ItemIcon/KGPDHCIB.png',
            symbol_description: '그랜드리스 지역의 심볼',
            symbol_force: '330',
            symbol_level: 5,
            symbol_str: '25',
            symbol_dex: '25',
            symbol_int: '25',
            symbol_luk: '25',
            symbol_hp: '1250',
            symbol_drop_rate: '0%',
            symbol_meso_rate: '0%',
            symbol_exp_rate: '0%',
            symbol_growth_count: 0,
            symbol_require_growth_count: 0,
        },
    ],
};

const meta = {
    title: 'Features/UserInfo/UserSymbolCard',
    component: UserSymbolCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => {
            userStore.setUserSymbolEquipment(mockUserSymbolEquipment);
            return <Story />;
        },
    ],
} satisfies Meta<typeof UserSymbolCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
