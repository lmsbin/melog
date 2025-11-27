/**
 * OCID 조회 TanStack Query Hook
 *
 * 닉네임을 받아서 OCID를 조회하는 useQuery hook입니다.
 * enabled 옵션을 사용하여 nickName이 있을 때만 쿼리를 실행합니다.
 * OCID는 캐싱 대상이 아니므로 staleTime을 0으로 설정합니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getOcid } from '../api/getOcid';
import type { GetOcidRequest } from '../types';

export function useOcid(nickName: string | null) {
	return useQuery({
		queryKey: ['ocid', nickName],
		queryFn: () => getOcid({ nickName: nickName! }),
		enabled: !!nickName, // nickName이 있을 때만 쿼리 실행
		staleTime: 0, // OCID는 캐싱하지 않음
		retry: 1,
	});
}
