import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserStatInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserStatInfoRequest {}

export type GetUserStatInfoResponse = UserStatInfo;

async function getUserStatInfo() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserStatInfo`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserStatInfoRequest, GetUserStatInfoResponse>(getUserStatInfo);
