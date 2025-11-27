/**
 * 유저 헥사 매트릭스 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 헥사 매트릭스 정보를 조회하는 API 함수입니다.
 * 헥사 코어 장비 정보와 연결된 스킬 정보를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserHexaMatrix } from '../types';

export interface GetUserHexaMatrixRequest {
	ocid: string;
}

export async function getUserHexaMatrix(
	request: GetUserHexaMatrixRequest
): Promise<UserHexaMatrix> {
	return apiClient<UserHexaMatrix>('/getUserHexaMatrix', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}
