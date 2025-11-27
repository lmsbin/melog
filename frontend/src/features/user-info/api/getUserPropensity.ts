/**
 * 유저 성향 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 성향 정보를 조회하는 API 함수입니다.
 * 카리스마, 감성, 통찰력, 의지, 손재주, 매력 레벨을 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserPropensity } from '../types';

export interface GetUserPropensityRequest {
	ocid: string;
}

export async function getUserPropensity(
	request: GetUserPropensityRequest
): Promise<UserPropensity> {
	return apiClient<UserPropensity>('/getUserPropensity', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

