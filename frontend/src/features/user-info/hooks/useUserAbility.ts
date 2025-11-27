/**
 * 유저 어빌리티 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 어빌리티 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserAbility } from '../api/getUserAbility';

export function useUserAbility(ocid: string | null) {
	return useQuery({
		queryKey: ['userAbility', ocid],
		queryFn: () => getUserAbility({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

