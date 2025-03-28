import { memo } from 'react';
import { SearchInput } from './input';
import { SearchButton } from './button';
import { useSearch } from '../hook';

export const SearchBar = memo(function SearchBar() {
  const { onChange, onClick, onKeyDown } = useSearch();

  return (
    <div className="flex w-60 rounded-xs border-1 p-2">
      <SearchInput key="search_input" onChange={onChange} onKeyDown={onKeyDown} />
      <SearchButton onClick={onClick} />
    </div>
  );
});
