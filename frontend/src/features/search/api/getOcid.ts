/**
 * OCID 조회 API 함수
 *
 * 닉네임을 받아서 해당 캐릭터의 OCID를 조회하는 API 함수입니다.
 * OCID는 다른 유저 정보 API를 호출할 때 필요한 식별자입니다.
 * 이 API는 캐싱 대상이 아니므로 항상 최신 데이터를 조회합니다.
 * 백엔드 API는 uuid 헤더를 요구하므로 TEST_UUID를 헤더에 포함합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { GetOcidRequest, GetOcidResponse } from '../types';

export async function getOcid(
	request: GetOcidRequest
): Promise<GetOcidResponse> {
	return apiClient<GetOcidResponse>('/getOcid', {
		method: HttpMethod.POST,
		body: {
			nickName: request.nickName,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}
