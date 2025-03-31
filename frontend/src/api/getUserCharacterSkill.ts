import { BASE_URL, EN_FETCH_METHOD, TEST_UUID, UserCharacterSkill } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserCharacterSkillRequest {
    level: number;
    ocid: string;
}

export type GetUserCharacterSkillResponse = UserCharacterSkill;

async function getUserCharacterSkill(request: GetUserCharacterSkillRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserCharacterSkill`,
        method: EN_FETCH_METHOD.POST,
        param: {
            level: request.level,
            ocid: request.ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserCharacterSkillRequest, GetUserCharacterSkillResponse>(
    getUserCharacterSkill,
);
