import { BASE_URL, EN_FETCH_METHOD, UserAbility } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserAbilityRequest {
    ocid: string;
}

export type GetUserAbilityResponse = UserAbility;

async function getUserAbility({ ocid }: GetUserAbilityRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserAbility`,
        method: EN_FETCH_METHOD.POST,
        param: { ocid },
    });

    return result;
}

export default fetchWrapper<GetUserAbilityRequest, GetUserAbilityResponse>(getUserAbility);
