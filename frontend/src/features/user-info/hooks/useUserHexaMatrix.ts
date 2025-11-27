/**
 * 유저 헥사 매트릭스 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 헥사 매트릭스 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserHexaMatrix } from '../api/getUserHexaMatrix';

export function useUserHexaMatrix(ocid: string | null) {
	return useQuery({
		queryKey: ['userHexaMatrix', ocid],
		queryFn: () => getUserHexaMatrix({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

