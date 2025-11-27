import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchButton, SearchButtonProps } from './SearchButton';

const defaultArgs = {
    onClick: fn(),
} as SearchButtonProps;

const meta = {
    title: 'Base/Button/SearchButton',
    component: SearchButton,
    args: defaultArgs,
    tags: ['autodocs'],
    parameters: {
        layouts: 'centered',
    },
} as Meta<typeof SearchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        ...defaultArgs,
    },
};
