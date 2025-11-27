/**
 * 유저 V매트릭스 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 V매트릭스 정보를 조회하는 API 함수입니다.
 * V코어 장비 정보와 남은 슬롯 업그레이드 포인트를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserVMatrix } from '../types';

export interface GetUserVMatrixRequest {
	ocid: string;
}

export async function getUserVMatrix(
	request: GetUserVMatrixRequest
): Promise<UserVMatrix> {
	return apiClient<UserVMatrix>('/getUserVMatrix', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

