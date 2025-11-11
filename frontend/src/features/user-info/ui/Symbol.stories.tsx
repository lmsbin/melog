import type { Meta, StoryObj } from '@storybook/react-vite';
import { Symbol } from './Symbol';
import { UserSymbolEquipment } from '@/shared';

type SymbolProps = UserSymbolEquipment['symbol'][number];

const mockSymbol: SymbolProps = {
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
};

const meta = {
    title: 'Features/UserInfo/Symbol',
    component: Symbol,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: mockSymbol,
} satisfies Meta<typeof Symbol>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: mockSymbol,
};
