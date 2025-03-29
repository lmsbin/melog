import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserSymbolicEquipment } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserSymbolicEquipmentRequest {}

export type GetUserSymbolicEquipmentResponse = UserSymbolicEquipment;

async function getUserSymbolicEquipment() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserSymbolicEquipment`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserSymbolicEquipmentRequest, GetUserSymbolicEquipmentResponse>(
    getUserSymbolicEquipment,
);
