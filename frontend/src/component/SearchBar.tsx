import { memo } from 'react';
import { SearchInput } from './input';
import { SearchButton } from './button';
import { useSearch } from '../hook';

export const SearchBar = memo(function SearchBar() {
    const { onChange, onClick, onKeyDown } = useSearch();

    return (
        <div className="flex min-w-160 items-center rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition duration-500 hover:shadow-md">
            <SearchInput key="search_input" onChange={onChange} onKeyDown={onKeyDown} />
            <SearchButton onClick={onClick} />
        </div>
    );
});
