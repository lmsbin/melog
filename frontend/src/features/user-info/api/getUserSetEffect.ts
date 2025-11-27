/**
 * 유저 세트 효과 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 세트 효과 정보를 조회하는 API 함수입니다.
 * 각 세트의 이름, 총 세트 개수, 세트 효과 옵션을 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserSetEffect } from '../types';

export interface GetUserSetEffectRequest {
	ocid: string;
}

export async function getUserSetEffect(
	request: GetUserSetEffectRequest
): Promise<UserSetEffect> {
	return apiClient<UserSetEffect>('/getUserSetEffect', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

