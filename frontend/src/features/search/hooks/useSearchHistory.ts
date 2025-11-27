/**
 * 검색 기록 관리 Hook
 *
 * localStorage를 사용하여 검색 기록을 관리합니다.
 * 최대 5개의 검색 기록을 유지하며, 중복된 닉네임이 있으면 최신 검색으로 업데이트합니다.
 * 검색 기록이 5개를 초과하면 가장 오래된 기록을 제거합니다.
 */

'use client';

import { useCallback, useState, useEffect } from 'react';
import type { SearchHistory, SearchHistoryItem } from '../types';

const STORAGE_KEY = 'searchHistory';
const LIMIT_COUNT = 5;

export function useSearchHistory() {
	const [searchHistory, setSearchHistoryState] = useState<SearchHistory>(
		() => {
			// 초기값을 localStorage에서 가져옴
			if (typeof window === 'undefined') return [];
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : [];
		}
	);

	// localStorage 동기화
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
		}
	}, [searchHistory]);

	const addSearchHistory = useCallback((item: SearchHistoryItem) => {
		setSearchHistoryState((prev) => {
			const newHistory = [...prev];
			// 중복된 닉네임이 있으면 제거
			const existingIndex = newHistory.findIndex(
				(x) => x.nickName === item.nickName
			);
			if (existingIndex !== -1) {
				newHistory.splice(existingIndex, 1);
			}
			// 새로운 항목 추가
			newHistory.push(item);
			// 최대 개수 제한
			if (newHistory.length > LIMIT_COUNT) {
				newHistory.shift(); // 가장 오래된 항목 제거
			}
			return newHistory;
		});
	}, []);

	const removeSearchHistory = useCallback((nickName: string) => {
		setSearchHistoryState((prev) =>
			prev.filter((item) => item.nickName !== nickName)
		);
	}, []);

	const clearSearchHistory = useCallback(() => {
		setSearchHistoryState([]);
	}, []);

	return {
		searchHistory,
		addSearchHistory,
		removeSearchHistory,
		clearSearchHistory,
	};
}
