/**
 * 유저 장비 아이템 정보 조회 API 함수
 *
 * OCID를 받아서 해당 캐릭터의 장비 아이템 정보를 조회하는 API 함수입니다.
 * 각 장비의 옵션, 잠재능력, 추가옵션, 스타포스 등의 상세 정보를 반환합니다.
 */

import { apiClient } from '@/shared/api/client';
import { HttpMethod, TEST_UUID } from '@/shared/constants';
import type { UserItemEquipment } from '../types';

export interface GetUserItemEquipmentRequest {
	ocid: string;
}

export async function getUserItemEquipment(
	request: GetUserItemEquipmentRequest
): Promise<UserItemEquipment> {
	return apiClient<UserItemEquipment>('/getUserItemEquipment', {
		method: HttpMethod.POST,
		body: {
			ocid: request.ocid,
		},
		headers: {
			uuid: TEST_UUID,
		},
	});
}

