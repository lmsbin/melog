/**
 * 유저 하이퍼스탯 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 하이퍼스탯 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserHyperStatInfo } from '../api/getUserHyperStatInfo';

export function useUserHyperStatInfo(ocid: string | null) {
	return useQuery({
		queryKey: ['userHyperStatInfo', ocid],
		queryFn: () => getUserHyperStatInfo({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

