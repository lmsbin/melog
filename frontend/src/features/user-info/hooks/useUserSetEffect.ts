/**
 * 유저 세트 효과 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 세트 효과 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserSetEffect } from '../api/getUserSetEffect';

export function useUserSetEffect(ocid: string | null) {
	return useQuery({
		queryKey: ['userSetEffect', ocid],
		queryFn: () => getUserSetEffect({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

