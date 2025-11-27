/**
 * 유저 하이퍼스탯 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 하이퍼스탯 정보를 조회하는 API 함수입니다.
 * 3개의 프리셋 정보와 각 프리셋의 남은 포인트를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserHyperStatInfo } from '../types';

export interface GetUserHyperStatInfoRequest {
	ocid: string;
}

export async function getUserHyperStatInfo(
	request: GetUserHyperStatInfoRequest
): Promise<UserHyperStatInfo> {
	return apiClient<UserHyperStatInfo>('/getUserHyperStatInfo', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

