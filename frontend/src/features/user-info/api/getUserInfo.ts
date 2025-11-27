/**
 * 유저 기본 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 기본 정보를 조회하는 API 함수입니다.
 * 캐릭터 이름, 레벨, 직업, 길드명 등의 기본 정보를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserInfo } from '../types';

export interface GetUserInfoRequest {
	ocid: string;
}

export async function getUserInfo(
	request: GetUserInfoRequest
): Promise<UserInfo> {
	return apiClient<UserInfo>('/getUserInfo', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

