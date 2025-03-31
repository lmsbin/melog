import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserInfoRequest {
    ocid: string;
}

export type GetUserInfoResponse = UserInfo;

async function getUserInfo({ ocid }: GetUserInfoRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserInfo`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserInfoRequest, GetUserInfoResponse>(getUserInfo);
