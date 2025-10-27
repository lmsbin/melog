import { memo } from 'react';
import { ButtonProps, HostButton } from '../../host';

export type SearchButtonProps = Pick<ButtonProps, 'onClick'>;

export const SearchButton = memo(function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <HostButton
            className="ml-2 rounded-lg bg-gray-900 px-5 py-2 font-medium text-white transition-colors duration-200 hover:bg-gray-800"
            onClick={onClick}
        >
            검색
        </HostButton>
    );
});
