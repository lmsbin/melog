import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserSetEffect } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserSetEffectRequest {}

export type GetUserSetEffectResponse = UserSetEffect;

async function getUserSetEffect() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserSetEffect`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserSetEffectRequest, GetUserSetEffectResponse>(getUserSetEffect);
