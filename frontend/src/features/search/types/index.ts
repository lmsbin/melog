/**
 * 검색 관련 타입 정의
 *
 * 검색 기능에서 사용하는 모든 타입을 정의합니다.
 * GetOcidRequest/Response는 OCID 조회 API의 요청/응답 타입이고,
 * 검색 기록(SearchHistory)은 `features/recent-searches`로 분리되었습니다.
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
