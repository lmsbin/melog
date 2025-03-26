import { memo } from 'react';
import { SearchInput } from './input';
import { SearchButton } from './button';
import { useSearch } from '../hook';

export const SearchBar = memo(function SearchBar() {
	const { onChange, onClick, onKeyDown } = useSearch();

	return (
		<>
			<SearchInput
				key='search_input'
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<SearchButton onClick={onClick} />
		</>
	);
});
