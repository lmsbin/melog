import { BASE_URL, EN_FETCH_METHOD, UserItemEquipment } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserItemEquipmentRequest {
    ocid: string;
}

export type GetUserItemEquipmentResponse = UserItemEquipment;

async function getUserItemEquipment({ ocid }: GetUserItemEquipmentRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserItemEquipment`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserItemEquipmentRequest, GetUserItemEquipmentResponse>(
    getUserItemEquipment,
);
