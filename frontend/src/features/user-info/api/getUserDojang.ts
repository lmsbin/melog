/**
 * 유저 무릉도장 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 무릉도장 정보를 조회하는 API 함수입니다.
 * 최고 층수, 기록 날짜, 최고 시간을 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserDojang } from '../types';

export interface GetUserDojangRequest {
	ocid: string;
}

export async function getUserDojang(
	request: GetUserDojangRequest
): Promise<UserDojang> {
	return apiClient<UserDojang>('/getUserDojang', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

