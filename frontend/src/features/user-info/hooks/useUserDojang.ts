/**
 * 유저 무릉도장 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 무릉도장 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserDojang } from '../api/getUserDojang';

export function useUserDojang(ocid: string | null) {
	return useQuery({
		queryKey: ['userDojang', ocid],
		queryFn: () => getUserDojang({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

