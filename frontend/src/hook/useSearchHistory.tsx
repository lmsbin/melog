import { SearchHistory, SearchHistoryItem } from '@/shared';
import localStorageStore from '@/store/localStorageStore';
import { useCallback, useState } from 'react';

// 로컬스토리지 - 배열
// 메모리 - 연결 리스트로 관리하면 성능상 더 이점을 가질듯
export const useSearchHistory = () => {
    const LIMIT_COUNT = 5;

    const [searchHistory, setSearchHistoryState] = useState(
        (localStorageStore.getData('history') ?? []) as SearchHistory,
    );

    const setSearchHistory = useCallback(
        (history: SearchHistoryItem) => {
            const index = searchHistory.findIndex((x) => x.nickName === history.nickName);
            const spliceIndex = index !== -1 ? index : 0;
            const spliceCount = searchHistory.length >= LIMIT_COUNT ? 1 : 0;

            searchHistory.splice(spliceIndex, spliceCount);
            searchHistory.push(history);

            const newSearchHistory = [...searchHistory];

            localStorageStore.setData('history', searchHistory);

            setSearchHistoryState(newSearchHistory);
        },
        [searchHistory],
    );

    return {
        searchHistory,
        setSearchHistory,
    };
};
