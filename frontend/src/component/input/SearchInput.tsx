import { memo, useContext, useEffect } from 'react';
import { BaseInput } from './BaseInput';
import { useSearch } from '../../hook';
import { StoreContainerContext } from '../../application';

export const SearchInput = memo(function SearchInput() {
	const { searchData, setInputData } = useContext(StoreContainerContext);

	const { onKeyDown, onChange } = useSearch({ searchData, setInputData });

	return <BaseInput onKeyDown={onKeyDown} onChange={onChange} />;
});
