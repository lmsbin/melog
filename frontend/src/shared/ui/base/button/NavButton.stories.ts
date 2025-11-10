import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavButton, NavButtonProps } from './NavButton';
import { fn } from 'storybook/test';
import { layouts } from 'chart.js';

const defaultArgs = {
    index: 0,
    onClick: fn(),
    isOpen: false,
    children: 'NavButton',
} as NavButtonProps;

const meta = {
    title: 'Base/Button/NavButton',
    component: NavButton,
    args: defaultArgs,
    tags: ['autodocs'],
    parameters: {
        layouts: 'centered',
    },
} as Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ...defaultArgs,
    },
};
