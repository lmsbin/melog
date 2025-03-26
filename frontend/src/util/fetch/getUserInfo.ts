import { EN_FETCH_METHOD, UserInfo } from '../../type';
import { BASE_URL } from '../../type/constant';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserInfoRequest {
	nickName: string;
}

export interface GetUserInfoResponse {
	userInfo: UserInfo;
}

async function getUserInfo(request: GetUserInfoRequest) {
	const result = await baseFetch({
		url: `${BASE_URL}/getUserInfo`,
		method: EN_FETCH_METHOD.GET,
		headers: {
			uuid: Date.now().toString(),
		},
	});

	return result;
}

export default fetchWrapper<GetUserInfoRequest, GetUserInfoResponse>(
	getUserInfo
);
