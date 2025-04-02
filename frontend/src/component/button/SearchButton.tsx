import { memo } from 'react';
import { BaseButton, ButtonProps } from './BaseButton';

export type SearchButtonProps = Pick<ButtonProps, 'onClick'>;

export const SearchButton = memo(function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <BaseButton
            className="ml-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            onClick={onClick}
        >
            검색
        </BaseButton>
    );
});
