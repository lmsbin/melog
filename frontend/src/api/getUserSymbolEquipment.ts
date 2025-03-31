import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserSymbolEquipment } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserSymbolEquipmentRequest {
    ocid: string;
}

export type GetUserSymbolEquipmentResponse = UserSymbolEquipment;

async function getUserSymbolEquipment({ ocid }: GetUserSymbolEquipmentRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserSymbolEquipment`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserSymbolEquipmentRequest, GetUserSymbolEquipmentResponse>(
    getUserSymbolEquipment,
);
