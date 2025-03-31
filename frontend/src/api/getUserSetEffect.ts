import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserSetEffect } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserSetEffectRequest {
    ocid: string;
}

export type GetUserSetEffectResponse = UserSetEffect;

async function getUserSetEffect({ ocid }: GetUserSetEffectRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserSetEffect`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserSetEffectRequest, GetUserSetEffectResponse>(getUserSetEffect);
