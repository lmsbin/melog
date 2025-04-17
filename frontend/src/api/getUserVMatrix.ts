import { BASE_URL, EN_FETCH_METHOD, UserVMatrix } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserVMatrixRequest {
    ocid: string;
}

export type GetUserVMatrixResponse = UserVMatrix;

async function getUserVMatrix({ ocid }: GetUserVMatrixRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getUserVMatrix`,
        method: EN_FETCH_METHOD.POST,
        param: {
            ocid,
        },
    });

    return result;
}

export default fetchWrapper<GetUserVMatrixRequest, GetUserVMatrixResponse>(getUserVMatrix);
