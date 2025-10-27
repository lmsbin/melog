import { useSearch } from '@/hook';
import { SearchButton } from '@/shared';
import { SearchInput } from '@/shared/ui/base/input/SearchInput';
import { memo } from 'react';

export const SearchBar = memo(function SearchBar() {
    const { onChange, onClick, onKeyDown } = useSearch();

    return (
        <div className="flex min-w-160 items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
            <SearchInput key="search_input" onChange={onChange} onKeyDown={onKeyDown} />
            <SearchButton onClick={onClick} />
        </div>
    );
});
