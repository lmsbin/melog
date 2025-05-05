import { useSearchHistory } from '@/hook/useSearchHistory';
import { memo } from 'react';

export const SearchHistoryCardWrapper = memo(function SearchHistoryCardWrapper() {
    const { searchHistory } = useSearchHistory();
    return <div>{searchHistory[0]?.nickName}</div>;
});

export const SearchHistoryCard = memo(function SearchHistoryCard() {
    return <div></div>;
});
