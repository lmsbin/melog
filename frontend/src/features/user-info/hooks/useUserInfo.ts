/**
 * 유저 기본 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 기본 정보를 조회하는 useQuery hook입니다.
 * enabled 옵션을 사용하여 ocid가 있을 때만 쿼리를 실행합니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/getUserInfo';

export function useUserInfo(ocid: string | null) {
	return useQuery({
		queryKey: ['userInfo', ocid],
		queryFn: () => getUserInfo({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
	});
}

