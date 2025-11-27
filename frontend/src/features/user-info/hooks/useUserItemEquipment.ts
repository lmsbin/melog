/**
 * 유저 장비 아이템 정보 조회 TanStack Query Hook
 *
 * OCID를 받아서 유저 장비 아이템 정보를 조회하는 useQuery hook입니다.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserItemEquipment } from '../api/getUserItemEquipment';

export function useUserItemEquipment(ocid: string | null) {
	return useQuery({
		queryKey: ['userItemEquipment', ocid],
		queryFn: () => getUserItemEquipment({ ocid: ocid! }),
		enabled: !!ocid,
		staleTime: 1000 * 60 * 5,
	});
}

