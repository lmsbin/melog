import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserPropensity } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserPropensityRequest {}

export type GetUserPropensityResponse = UserPropensity;

async function getUserPropensity() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserPropensity`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserPropensityRequest, GetUserPropensityResponse>(getUserPropensity);
