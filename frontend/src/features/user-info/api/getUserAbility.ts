/**
 * 유저 어빌리티 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 어빌리티 정보를 조회하는 API 함수입니다.
 * 어빌리티 등급과 각 어빌리티의 상세 정보를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserAbility } from '../types';

export interface GetUserAbilityRequest {
	ocid: string;
}

export async function getUserAbility(
	request: GetUserAbilityRequest
): Promise<UserAbility> {
	return apiClient<UserAbility>('/getUserAbility', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

