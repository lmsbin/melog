import { BASE_URL, EN_FETCH_METHOD, UserPropensity } from '../shared';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserPropensityRequest {
    ocid: string;
}

export type GetUserPropensityResponse = UserPropensity;

async function getUserPropensity({ ocid }: GetUserPropensityRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserPropensity`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserPropensityRequest, GetUserPropensityResponse>(getUserPropensity);
