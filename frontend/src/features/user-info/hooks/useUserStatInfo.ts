/**
 * 유저 스탯 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 스탯 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserStatInfo } from '../api/getUserStatInfo';

export function useUserStatInfo(ocid: string | null) {
	return useQuery({
		queryKey: ['userStatInfo', ocid],
		queryFn: () => getUserStatInfo({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

