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
	// 서버와 클라이언트의 초기값을 일치시키기 위해 항상 빈 배열로 시작
	const [searchHistory, setSearchHistoryState] = useState<SearchHistory>([]);
	const [isMounted, setIsMounted] = useState(false);

	// 클라이언트에서만 localStorage에서 초기값 로드
	useEffect(() => {
		setIsMounted(true);
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					setSearchHistoryState(parsed);
				} catch (e) {
					console.error(
						'Failed to parse search history from localStorage',
						e
					);
				}
			}
		}
	}, []);

	// localStorage 동기화 (클라이언트에서만)
	useEffect(() => {
		if (isMounted && typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
		}
	}, [searchHistory, isMounted]);

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
		isMounted, // 클라이언트 마운트 여부를 반환하여 레이아웃 시프트 방지
		addSearchHistory,
		removeSearchHistory,
		clearSearchHistory,
	};
}
