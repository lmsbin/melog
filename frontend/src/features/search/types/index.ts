/**
 * 검색 관련 타입 정의
 *
 * 검색 기능에서 사용하는 모든 타입을 정의합니다.
 * GetOcidRequest/Response는 OCID 조회 API의 요청/응답 타입이고,
 * SearchHistory는 검색 기록을 관리하기 위한 타입입니다.
 */

/**
 * OCID 조회 API 요청 타입
 */
export interface GetOcidRequest {
	nickName: string;
}

/**
 * OCID 조회 API 응답 타입
 */
export interface GetOcidResponse {
	ocid: string;
}

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
