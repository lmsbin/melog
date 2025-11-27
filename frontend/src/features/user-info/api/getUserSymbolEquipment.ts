/**
 * 유저 심볼 장비 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 심볼 장비 정보를 조회하는 API 함수입니다.
 * 각 심볼의 레벨, 스탯, 성장 정보 등을 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserSymbolEquipment } from '../types';

export interface GetUserSymbolEquipmentRequest {
	ocid: string;
}

export async function getUserSymbolEquipment(
	request: GetUserSymbolEquipmentRequest
): Promise<UserSymbolEquipment> {
	return apiClient<UserSymbolEquipment>('/getUserSymbolEquipment', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

