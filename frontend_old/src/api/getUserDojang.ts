import { BASE_URL, EN_FETCH_METHOD, UserDojang } from '../shared';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserDojangRequest {
    ocid: string;
}

export type GetUserDojangResponse = UserDojang;

async function getUserDojang({ ocid }: GetUserDojangRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserDojang`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserDojangRequest, GetUserDojangResponse>(getUserDojang);
