import { memo } from 'react';
import { ButtonProps, HostButton } from '../../host';

export type SearchButtonProps = Pick<ButtonProps, 'onClick'>;

export const SearchButton = memo(function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <HostButton
            className="ml-2 rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            onClick={onClick}
        >
            검색
        </HostButton>
    );
});
