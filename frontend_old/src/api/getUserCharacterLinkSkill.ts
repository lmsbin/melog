import { BASE_URL, EN_FETCH_METHOD, UserHyperStatInfo } from '../shared';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserCharacterLinkSkillRequest {
    ocid: string;
}
export type GetUserCharacterLinkSkillResponse = UserHyperStatInfo;

async function getUserCharacterLinkSkill({ ocid }: GetUserCharacterLinkSkillRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserCharacterLinkSkill`,
        method: EN_FETCH_METHOD.POST,
        param: { ocid },
    });

    return result;
}

export default fetchWrapper<GetUserCharacterLinkSkillRequest, GetUserCharacterLinkSkillResponse>(
    getUserCharacterLinkSkill,
);
