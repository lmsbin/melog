import { memo } from 'react';
import { SearchInput } from './input';
import { SearchButton } from './button';

export const SearchBar = memo(function SearchBar() {
	return (
		<>
			<SearchInput />
			<SearchButton />
		</>
	);
});
