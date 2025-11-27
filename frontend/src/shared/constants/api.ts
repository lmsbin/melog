/**
 * API 관련 상수 정의
 *
 * API 호출에 필요한 기본 상수들을 정의합니다.
 * BASE_URL은 환경 변수 NEXT_PUBLIC_API_URL이 설정되어 있으면 해당 값을 사용하고,
 * 없으면 기본값으로 localhost:3000을 사용합니다.
 * HttpMethod enum은 HTTP 메서드 타입을 정의하여 타입 안정성을 제공합니다.
 */

export const BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}
