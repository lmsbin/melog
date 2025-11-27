/**
 * 유저 스탯 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 스탯 정보를 조회하는 API 함수입니다.
 * 최종 스탯 값들을 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserStatInfo } from '../types';

export interface GetUserStatInfoRequest {
	ocid: string;
}

export async function getUserStatInfo(
	request: GetUserStatInfoRequest
): Promise<UserStatInfo> {
	return apiClient<UserStatInfo>('/getUserStatInfo', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

