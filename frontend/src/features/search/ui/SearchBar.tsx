import { useSearch } from '@/hook';
import { SearchButton } from '@/shared';
import { SearchInput } from '@/shared/ui/base/input/SearchInput';
import { memo } from 'react';

export const SearchBar = memo(function SearchBar() {
    const { onChange, onClick, onKeyDown } = useSearch();

    return (
        <div className="flex min-w-160 items-center rounded-lg border border-gray-300 bg-white p-2 shadow-sm transition duration-500 hover:shadow-md">
            <SearchInput key="search_input" onChange={onChange} onKeyDown={onKeyDown} />
            <SearchButton onClick={onClick} />
        </div>
    );
});
