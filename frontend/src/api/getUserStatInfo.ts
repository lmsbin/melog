import { BASE_URL, EN_FETCH_METHOD, UserStatInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserStatInfoRequest {
    ocid: string;
}

export type GetUserStatInfoResponse = UserStatInfo;

async function getUserStatInfo({ ocid }: GetUserStatInfoRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserStatInfo`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserStatInfoRequest, GetUserStatInfoResponse>(getUserStatInfo);
