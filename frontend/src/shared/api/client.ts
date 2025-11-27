/**
 * 공통 API 클라이언트
 *
 * 모든 API 호출의 기본 설정을 담당하는 공통 함수입니다.
 * BASE_URL을 자동으로 추가하여 전체 URL을 구성하고, Content-Type을 application/json으로 설정합니다.
 * HTTP 응답 상태를 확인하여 실패 시 ApiError를 throw하며, 네트워크 에러 등 기타 에러도 ApiError로 변환합니다.
 * GET 메서드가 아닌 경우에만 요청 body를 JSON으로 직렬화하여 전송합니다.
 * 모든 API 함수는 이 apiClient를 사용하여 일관된 에러 처리와 설정을 유지합니다.
 */

import { BASE_URL, HttpMethod } from '@/shared/constants';

export interface ApiRequestOptions {
	method?: HttpMethod;
	body?: unknown;
	headers?: Record<string, string>;
}

export class ApiError extends Error {
	constructor(message: string, public status: number, public data?: unknown) {
		super(message);
		this.name = 'ApiError';
	}
}

export async function apiClient<T = unknown>(
	endpoint: string,
	options: ApiRequestOptions = {}
): Promise<T> {
	const { method = HttpMethod.POST, body, headers = {} } = options;

	try {
		const url = `${BASE_URL}${endpoint}`;

		const fetchOptions: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
		};

		// GET 메서드가 아닐 때만 body 추가
		if (method !== HttpMethod.GET && body) {
			fetchOptions.body = JSON.stringify(body);
		}

		const response = await fetch(url, fetchOptions);

		if (!response.ok) {
			let errorData: unknown;
			try {
				errorData = await response.json();
			} catch {
				errorData = await response.text();
			}

			throw new ApiError(
				`API 요청 실패: ${response.status} ${response.statusText}`,
				response.status,
				errorData
			);
		}

		const data = await response.json();
		return data as T;
	} catch (error) {
		// ApiError는 그대로 전달
		if (error instanceof ApiError) {
			throw error;
		}

		// 네트워크 에러 등 기타 에러
		throw new ApiError(
			error instanceof Error
				? error.message
				: '알 수 없는 에러가 발생했습니다.',
			0,
			error
		);
	}
}
