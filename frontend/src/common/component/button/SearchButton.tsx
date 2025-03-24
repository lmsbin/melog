import { memo } from 'react';
import { BaseButton } from './BaseButton';

export const SearchButton = memo(function SearchButton() {
	return <BaseButton>검색하기</BaseButton>;
});
