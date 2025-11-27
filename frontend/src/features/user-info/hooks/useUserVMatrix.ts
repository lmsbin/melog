/**
 * 유저 V매트릭스 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 V매트릭스 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserVMatrix } from '../api/getUserVMatrix';

export function useUserVMatrix(ocid: string | null) {
	return useQuery({
		queryKey: ['userVMatrix', ocid],
		queryFn: () => getUserVMatrix({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

