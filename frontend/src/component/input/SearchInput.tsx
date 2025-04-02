import { memo } from 'react';
import { BaseInput, InputProps } from './BaseInput';

export type SearchInputProps = Pick<InputProps, 'onChange' | 'onKeyDown'>;

export const SearchInput = memo(function SearchInput({ onChange, onKeyDown }: SearchInputProps) {
    return (
        <BaseInput
            className="flex-grow bg-transparent px-3 py-2 outline-none"
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
});
