/**
 * 유저 성향 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 성향 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserPropensity } from '../api/getUserPropensity';

export function useUserPropensity(ocid: string | null) {
	return useQuery({
		queryKey: ['userPropensity', ocid],
		queryFn: () => getUserPropensity({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

