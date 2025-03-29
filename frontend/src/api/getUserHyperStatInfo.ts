import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserHyperStatInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserHyperStatInfoRequest {}
export type GetUserHyperStatInfoResponse = UserHyperStatInfo;

async function getUserHyperStatInfo() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserHyperStatInfo`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserHyperStatInfoRequest, GetUserHyperStatInfoResponse>(
    getUserHyperStatInfo,
);
