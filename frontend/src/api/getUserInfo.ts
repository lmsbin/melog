import { BASE_URL, EN_FETCH_METHOD, UserInfo } from '../type';
import { baseFetch, fetchWrapper } from './fetch';

export interface GetUserInfoRequest {}

export type GetUserInfoResponse = UserInfo;

async function getUserInfo() {
	const result = await baseFetch({
		url: `${BASE_URL}/getUserInfo`,
		method: EN_FETCH_METHOD.GET,
		headers: {
			uuid: 'asdfafsafawefafewf',
		},
	});

	return result;
}

export default fetchWrapper<GetUserInfoRequest, GetUserInfoResponse>(
	getUserInfo
);
