import { BASE_URL, EN_FETCH_METHOD, UserHyperStatInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserHyperStatInfoRequest {
    ocid: string;
}
export type GetUserHyperStatInfoResponse = UserHyperStatInfo;

async function getUserHyperStatInfo({ ocid }: GetUserHyperStatInfoRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserHyperStatInfo`,
        method: EN_FETCH_METHOD.POST,
        param: { ocid },
    });

    return result;
}

export default fetchWrapper<GetUserHyperStatInfoRequest, GetUserHyperStatInfoResponse>(
    getUserHyperStatInfo,
);
