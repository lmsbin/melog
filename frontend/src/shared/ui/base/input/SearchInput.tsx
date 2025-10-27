import { memo } from 'react';
import { BaseInput, InputProps } from '../../host';

export type SearchInputProps = Pick<InputProps, 'onChange' | 'onKeyDown'>;

export const SearchInput = memo(function SearchInput({ onChange, onKeyDown }: SearchInputProps) {
    return (
        <BaseInput
            className="flex-grow bg-transparent text-gray-700 placeholder-gray-400 outline-none"
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
});
