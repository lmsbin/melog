import { EN_FETCH_METHOD, BASE_URL } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetOcidRequest {
    nickName: string;
}

export interface GetOcidResponse {
    ocid: string;
}

async function getOcid(request: GetOcidRequest) {
    const result = await baseFetch({
        url: `${BASE_URL}/getOcid`,
        method: EN_FETCH_METHOD.POST,
        param: {
            nickName: request.nickName,
        },
        headers: {
            uuid: 'asdfafsafawefafewf',
        },
    });

    return result;
}

// ocid는 캐싱 대상이 아니다
export default fetchWrapper<GetOcidRequest, GetOcidResponse>(getOcid);
