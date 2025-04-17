import { BASE_URL, EN_FETCH_METHOD, UserHexaMatrix } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserHexaMatrixRequest {
    ocid: string;
}

export type GetUserHexaMatrixResponse = UserHexaMatrix;

async function getUserHexaMatrix({ ocid }: GetUserHexaMatrixRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserHexaMatrix`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserHexaMatrixRequest, GetUserHexaMatrixResponse>(getUserHexaMatrix);
