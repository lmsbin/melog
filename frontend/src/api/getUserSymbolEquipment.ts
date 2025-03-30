import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserSymbolEquipment } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserSymbolEquipmentRequest {}

export type GetUserSymbolEquipmentResponse = UserSymbolEquipment;

async function getUserSymbolEquipment() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserSymbolEquipment`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserSymbolEquipmentRequest, GetUserSymbolEquipmentResponse>(
    getUserSymbolEquipment,
);
