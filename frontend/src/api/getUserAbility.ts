import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserAbility } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserAbilityRequest {}

export type GetUserAbilityResponse = UserAbility;

async function getUserAbility() {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserAbility`,
        method: EN_FETCH_METHOD.GET,
        headers: {
            uuid: TEST_UUID,
        },
    });

    return result;
}

export default fetchWrapper<GetUserAbilityRequest, GetUserAbilityResponse>(getUserAbility);
