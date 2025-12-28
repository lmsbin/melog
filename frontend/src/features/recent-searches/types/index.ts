/**
 * 최근 검색(검색 기록) 관련 타입 정의
 *
 * "최근 검색" 기능에서 사용하는 타입을 정의합니다.
 * - SearchHistoryItem: 개별 검색 기록
 * - SearchHistory: 검색 기록 목록
 */

/**
 * 검색 기록 아이템 타입
 */
export interface SearchHistoryItem {
	nickName: string;
	searchedAt: number; // timestamp
}

/**
 * 검색 기록 배열 타입
 */
export type SearchHistory = SearchHistoryItem[];
